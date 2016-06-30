'use strict';

const Boom = require('boom');
const Hoek = require('hoek');
const Joi = require('joi');

module.exports = {
  auth: false,
  validate: {
    payload: {
      username: Joi.string().required(),
      password: Joi.string().required(),
      device: Joi.string().allow('')
    }
  },
  handler: (request, reply) => {

    const Users = request.collections.user;
    const username = request.payload.username;
    const password = request.payload.password;
    const device = request.payload.device || request.info.remoteAddress;

    Users
      .authenticate(request.payload.username, request.payload.password)
      .then((response) => {

        // Invalid credentail, no user object is returned
        if (!response.data) {
          return reply(response);
        }

        let user = response.data.toJSON();
        user.device = device;

        if (user.role === 'Admin') {
          user.scope = user.scope || [];
          user.scope = Hoek.merge(user.scope, ['admin']);
        }

        const token = request.token.sign(user);
        const Authentication = request.collections.authentication;
        const Permissions = request.collections.permission;

        Authentication
          .findOrCreate({
            user: user.email,
            device: device
          },
          {
            user: user.email,
            device: device,
            token: token
          })
          .then(_ => {

            return Permissions
              .findOne({ id: user.permission })
              .populate('onhandLocation')
              .populate('onhandWarehouse')
              .then(function (permission) {

                user.permission = permission.toJSON();
                return reply(user).header('Authorization', token);
              });
          });
      })
      .catch((err) => {

        return reply(Boom.badImplementation(err));
      })
      .done();
  }
};
