'use strict';

const Boom = require('boom');
const Joi = require('joi');
const Promise = require('bluebird');

module.exports = {
  // auth: {
  //   strategy: 'authentication',
  //   scope: ['admin']
  // },
  validate: {
    payload: {
      firstName: Joi.string().required(),
      lastName: Joi.string(),
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      password: Joi.string().required(),
      currency: Joi.string().required(),
      role: Joi.string().required(),
      status: Joi.boolean().required(),
      company: Joi.string().required(),
      location: Joi.string().required(),
      warehouse: Joi.string().required(),
      permission: Joi.object({
        productGroup: Joi.number().integer().required(),
        onhandLocation: Joi.object({
          type: Joi.string().required(),
          places: Joi.array().items(Joi.string())
        }).required(),
        onhandWarehouse: Joi.object({
          type: Joi.string().required(),
          places: Joi.array().items(Joi.string())
        }).required(),
        price: Joi.string().required()
      }).required(),
      webOnly: Joi.boolean().required()
    }
  },
  pre: [{ method: (request, reply) => {

    const Users = request.collections.user;

    Promise
    .all([Users.findOneByUsername(request.payload.username), Users.findOneByEmail(request.payload.email)])
    .spread(function (foundByUsername, foundByEmail) {

      if (foundByUsername) {
        return reply({
          response: Boom.badRequest('this username is already in use.'),
          status: false
        });
      }

      if (foundByEmail) {
        return reply({
          response: Boom.badRequest('this email is already in use.'),
          status: false
        });
      }

      return reply({ status: true });

    })
    .catch(function (err) {

      return reply({
        response: Boom.badImplementation(err),
        status: false
      });
    })
    .done();
  }, assign: 'validation' }],
  handler: (request, reply) => {

    const validation = request.pre.validation;

    if (!validation.status) {
      return reply(validation.response);
    }

    const Users = request.collections.user;
    const Permissions = request.collections.permission;
    const Onhands = request.collections.onhand;

    Users
      .create(request.payload)
      .then(function (user) {

        return Permissions.update({ id: user.permission }, { user: user.id });
      })
      .then(function ([permission, ...rest]) {

        return Onhands.update({ id: permission.onhand }, { permission: permission.id });
      })
      .then(function ([onhand, ... rest]) {

        return Permissions
          .findOne({ id: onhand.permission })
          .populate('onhandLocation')
          .populate('onhandWarehouse')
          .then(function (permission) {

            return permission;
          });
      })
      .then(function (permission) {

        return Users
          .findOne({ id: permission.user })
          .then(function (user) {

            user.permission = permission.toJSON();
            return reply({ data: user.toJSON() });
          });
      })
      .catch((err) => {

        return reply(Boom.badImplementation(err));
      })
      .done();
  }
};
