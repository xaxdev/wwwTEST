'use strict';

const Boom = require('boom');
const Joi = require('joi');
const Bcrypt = require('bcrypt');
const Promise = require('bluebird');

module.exports = {
    auth: {
        strategy: 'authentication',
        scope: ['admin']
    },
    validate: {
        params: {
            id: Joi.number().integer().positive().required()
        }
    },
    pre: [{ method: (request, reply) => {
        // console.log('pre-->');
        const Users = request.collections.user;
        // Username can't be changed (after discussion with Goong on 29/02/2016)
        delete request.payload.username;
        // Email must not be used already (after discussion with Goong on 29/02/2016)
        if (request.payload.email) {
            Users
            .findOneByEmail(request.payload.email)
            .then(function (user) {
                if (user && user.id !== request.params.id) {
                    return reply({
                        response: Boom.badRequest('this email is already in use.'),
                        status: false
                    });
                }
                // encrypt password if exists
                if (request.payload.password !== undefined) {
                    return internals
                    .encrypt(request.payload.password)
                    .then(function (hash) {
                        request.payload.password = hash;
                        return reply({ status: true });
                    });
                }
                else {
                    return reply({ status: true });
                }
            })
            .catch(function (err) {
                return reply({
                    response: Boom.badImplementation(err),
                    status: false
                });
            })
            .done();
        }
        else {
            return reply({ status: true });
        }

    }, assign: 'validation' }],
    handler: (request, reply) => {
        const validation = request.pre.validation;
        if (!validation.status) {
            return reply(validation.response);
        }

        const Users = request.collections.user;
        const Permissions = request.collections.permission;
        const Authentication = request.collections.authentication;

        Users
        .update({ id: request.params.id }, request.payload)
        .then(function ([user, ...rest]) {
            if(!user.status){
                Authentication.destroy({user:user.email})
                .exec(function (err){
                    if (err) {
                        return reply(Boom.badImplementation(err));
                    }
                });
            }
            return Permissions
            .findOne({ id: user.permission })
            .populate('onhandLocation')
            .populate('onhandWarehouse')
            .populate('salesLocation')
            .populate('salesWarehouse')
            .then(function (permission) {
                user.permission = permission.toJSON();
                return reply({ data: user });
            });
        })
        .catch((err) => {
            return reply(Boom.badImplementation(err));
        })
        .done();
    }
};

const internals = {};

internals.encrypt = (password) => {
    const Encrypt = Promise.promisify(Bcrypt.hash);
    return Encrypt(password, 10);
}
