'use strict';

const Boom = require('boom');
const Joi = require('joi');

exports.multiple = {
    auth: {
        strategy: 'authentication',
        scope: ['admin']
    },
    handler: (request, reply) => {
        const Users = request.collections.user;
        Users
        .find()
        .populate('permission')
        .then((data) => {
            return reply({ data: data });
        })
        .catch((err) => {
            return reply(Boom.badImplementation(err));
        })
        .done();
    }
};

exports.one = {
    auth: {
        strategy: 'authentication',
        scope: ['admin']
    },
    validate: {
        params: {
            id: Joi.number().integer().positive().required()
        }
    },
    handler: (request, reply) => {
        const Users = request.collections.user;
        const Permissions = request.collections.permission;

        Users
        .findOne(request.params.id)
        .then(function (user) {
            if (!user) {
                return reply(Boom.badRequest('failed to find any user by the id.'));
            }
            return Permissions
              .findOne({ id: user.permission })
              .populate('onhandLocation')
              .populate('onhandWarehouse')
              .populate('salesLocation')
              .populate('salesWarehouse')
              .populate('salesChannel')
              .then(function (permission) {
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

exports.shareuser = {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {
        const Users = request.collections.user;
        Users
        .find()
        .populate('permission')
        .then((data) => {
            const users = data.map((user) => {
                return {email:user.email,username:user.username};
            })
            return reply({ data: users });
        })
        .catch((err) => {
            return reply(Boom.badImplementation(err));
        })
        .done();
    }
};
