'use strict';

const Boom = require('boom');
const Joi = require('joi');

exports.exist = {
    auth: { strategy: 'authentication' },
    handler: (request, reply) => {
        if (!request.query) {
          return reply(Boom.badRequest('no query is supplied.'));
        }

        const Users = request.collections.user;

        Users
        .findOne(request.query)
        .then(function (user) {
            if (user) {
                return reply(Boom.badRequest('this is already used.'));
            }
            return reply({ message: 'this is free to use.' });
        })
        .catch((err) => {
            return reply(Boom.badImplementation(err));
        })
        .done();
    }
};
