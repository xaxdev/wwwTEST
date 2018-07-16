'use strict';

const Boom = require('boom');
const Hoek = require('hoek');
const Joi = require('joi');

import release from '../../../release'

module.exports = {
  auth: false,
  validate: {
    payload: {
      username: Joi.string().required(),
      password: Joi.string().required(),
      device: Joi.string().allow(''),
      iPad: Joi.boolean(),
      version: Joi.number().integer()
    }
  },
  handler: (request, reply) => {

    (async _ => {

        try {
            const Users = request.collections.user;
            const Authentication = request.collections.authentication;
            const Permissions = request.collections.permission;

            const username = request.payload.username;
            const password = request.payload.password;
            const device = request.payload.device || request.info.remoteAddress;
            const iPad = request.payload.iPad || false
            const version = request.payload.version || 0

            const response = await Users.authenticate(request.payload.username, request.payload.password)
            if (!response.data) {
              return reply(response);
            }

            const user = response.data.toJSON();
            user.device = device;

            if (user.role === 'Admin') {
              user.scope = user.scope || [];
              user.scope = Hoek.merge(user.scope, ['admin']);
            }

            if (iPad) {
                if (user.webOnly) {
                    return reply(Boom.badRequest('Not authorized to use on iPad.'));
                }

                if (version > 0 && version < release.iPad) {
                    return reply(Boom.badRequest('Version is not latest.'));
                }

                await Authentication.clear(user.email);
            }

            const token = request.token.sign(user);
            await Authentication.findOrCreate({
                user: user.email,
                device
            }, {
                user: user.email,
                device,
                token,
                iPad
            })

            user.permission = await Permissions.findOne({ id: user.permission })
                .populate('onhandLocation')
                .populate('onhandWarehouse')
                .populate('salesLocation')
                .populate('salesWarehouse')
                .populate('salesChannel');
            return reply(user).header('Authorization', token);
        } catch (err) {
            return reply(Boom.badImplementation('', err));
        }
    })()
  }
};
