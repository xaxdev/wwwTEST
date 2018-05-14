'use strict';

const Boom = require('boom');
const Joi = require('joi');

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    validate: {
        params: {
            name: Joi.string().required()
        }
    },
    handler: (request, reply) => {
        (async _ => {
            try {
                const name = request.params.name;
                const Users = request.collections.user;

                Users
                .find()
                .where({
                    or:
                    [
                        { 'username': { contains: name }},
                        { 'email': { contains: name }}
                    ],
                    'status': true
                })
                .then((data) => {
                    return data.map((item) => {
                        if (item.id !== request.auth.credentials.id) {
                            return {
                                id: item.id,
                                firstName: item.firstName,
                                lastName: item.lastName,
                                email: item.email,
                                username: item.username
                            }
                        }
                    })
                })
                .then((data) => {
                    return reply({
                        data: data
                    })
                })
                .catch((err) => {
                    return reply(Boom.badImplementation(err));
                })
                .done();
            } catch (err) {
                return reply(Boom.badImplementation('', err));
            }
        })()
    }
}
