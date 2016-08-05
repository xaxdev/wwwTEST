'use strict';

const Jwt = require('jsonwebtoken');

exports.register = (server, options, next) => {
  
  const token = {
    sign: (user) => {

      return Jwt.sign(user, options.key);
    },
    verify: (token) => {

      return Jwt.verify(token, options.key);
    }
  };

  server.decorate('request', 'token', token);

  next();
};

exports.register.attributes = require('./package');
