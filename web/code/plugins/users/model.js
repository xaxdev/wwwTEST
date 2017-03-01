'use strict';

const Bcrypt = require('bcrypt');
const Boom = require('boom');
const Jwt = require('jsonwebtoken');
const Promise = require('bluebird');

module.exports = {
  schema: true,
  autoPK: false,
  identity: 'user',
  connection: 'mysql',
  migrate: 'safe',
  tableName: 'User',
  attributes: {
    id: {
      type: 'integer',
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string'
    },
    email: {
      type: 'string',
      email: true,
      unique: true,
      required: true,
      index: true
    },
    username: {
      type: 'string',
      unique: true,
      required: true,
      index: true
    },
    password: {
      type: 'string',
      required: true
    },
    currency: {
      type: 'string',
      required: true,
      size: 3
    },
    role: {
      type: 'string',
      enum: ['Admin', 'User'],
      required: true
    },
    status: {
      type: 'boolean',
      required: true
    },
    company: {
      type: 'string',
      required: true
    },
    location: {
      type: 'string',
      required: true
    },
    warehouse: {
      type: 'string'
    },
    permission: {
      model: 'permission'
    },
    webOnly: {
      type: 'boolean'
    },
    movement: {
      type: 'boolean'
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      delete obj.createdAt;
      delete obj.updatedAt;
      return obj;
    },
    verifyPassword: function (password) {

      const user = this;

      return Promise.promisify(Bcrypt.compare)(password, user.password);
    }
  },
  beforeCreate: function (user, next) {

    Bcrypt.hash(user.password, 10, function(err, hash) {

      if (err) {
        return next(err);
      }

      user.password = hash;

      next();
    });
  },
  authenticate: function (username, password) {

    const Users = this;

    return Users
      .findOneByUsername(username)
      .then(function (user) {

        if (!user) {
          return Boom.badRequest('Failed to find user with the username.');
        }

        if (!user.status) {
          return Boom.badRequest('User is inactive.');
        }

        return user
          .verifyPassword(password)
          .then(function (valid) {

            if (!valid) {
              return Boom.badRequest('Password is invalid.');
            }

            return { data: user };
          });
      });
  }
};
