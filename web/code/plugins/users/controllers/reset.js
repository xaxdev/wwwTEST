'use strict';

const Boom = require('boom');
const Bcrypt = require('bcrypt');
const Fs = require('fs');
const Handlebars = require('handlebars');
const Hoek = require('hoek');
const Joi = require('joi');
const Promise = require('bluebird');

const assert = require('assert');

exports.generate = {
  auth: false,
  validate: {
    payload: {
      email: Joi.string().email().required()
    }
  },
  handler: (request, reply) => {

    const Users = request.collections.user;
    const email = request.payload.email;

    Users
      .findOneByEmail(email)
      .then(function (user) {

        if (!user) {
          return reply(Boom.badRequest('Failed to find any account with this email.'));
        }

        if (!user.status) {
          return reply(Boom.badRequest('This user is not active.'));
        }

        // Load email template
        Promise
          .promisify(Fs.readFile)('./plugins/users/templates/reset.htm', { encoding: 'utf-8' })
          .then((template) => {

            // Generate password-reset link
            const expiration = Date.now() + 3600000;
            const token = request.cryptography.encrypt([email, expiration].join('#'));
            const link = `${request.connection.info.protocol}://${request.info.hostname}/resetpassword/${token}`;
            const content = Handlebars.compile(template)({ 'link': link });

            let config = request.email.configuration.reset;

            config.to = email;
            config.html = content;

            request.email.sendgrid.send(config);

            return reply({
              message: 'email has been sent.',
            });
          })
          .catch((err) => {

            return reply(Boom.badImplementation(err));
          })
          .done();
      })
      .done();
  }
};

exports.validate = {
  auth: false,
  handler: (request, reply) => {

    // toekn pattern: email#expiration
    const parameters = request.cryptography.decrypt(request.params.token).split('#');
    const email = parameters[0];
    const expiration = parameters[1];

    if (expiration < Date.now()) {
      return reply(Boom.badRequest('token is expired.'));
    }

    const Users = request.collections.user;
    const Authentication = request.collections.authentication;
    const Permissions = request.collections.permission;
    const device = request.info.remoteAddress;

    Users
      .findOneByEmail(email)
      .then((user) => {

        if (!user) {
          return reply(Boom.badRequest('token is invalid.'));
        }

        user = user.toJSON();
        user.device = device;

        if (user.role === 'Admin') {
          user.scope = user.scope || [];
          user.scope = Hoek.merge(user.scope, ['admin']);
        }

        const token = request.token.sign(user);

        return Authentication
          .findOrCreate({
            user: email,
            device: device
          },
          {
            user: email,
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
}

exports.update = {
  auth: {
    strategy: 'authentication'
  },
  validate: {
    payload: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  handler: (request, reply) => {

    const Users = request.collections.user;
    const Permissions = request.collections.permission;
    const username = request.payload.username;
    const password = request.payload.password;

    Users
      .findOneByUsername(request.payload.username)
      .then(function (user) {

        if (!user) {
          return reply(Boom.badRequest('no user with this username.'));
        }

        Bcrypt.hash(password, 10, function (err, hash) {

          if (err) {
            throw err;
          }

          Users
            .update({ username: username }, { password: hash })
            .then(function ([user, ...rest]) {

              return Permissions
                .findOne({ id: user.permission })
                .populate('onhandLocation')
                .populate('onhandWarehouse')
                .then(function (permission) {

                  user.permission = permission.toJSON();
                  return reply({
                    message: 'password has been updated.',
                    data: user
                  });
                });
            });
        });
      })
      .catch(function (err) {

        reply(Boom.badImplementation(err));
      })
      .done();
  }
}
