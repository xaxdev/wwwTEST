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
  migrate: 'alter',
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
      type: 'string',
      required: true
    },
    permission: {
      model: 'permission'
    },
    webOnly: {
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
          return Boom.badRequest('no user with the username.');
        }

        return user
          .verifyPassword(password)
          .then(function (valid) {

            if (!valid) {
              return Boom.badRequest('password is invalid.');
            }

            return { data: user };
          });
      });
  }
};
