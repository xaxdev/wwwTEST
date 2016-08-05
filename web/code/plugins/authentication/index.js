'use strict';

exports.register = (server, options, next) => {

  // Register hapi-auth-jwt2 as strategy of api server
  const api = server.select('api');

  api.auth.strategy('authentication', 'jwt', {
    key: options.key,
    validateFunc: require('./validation'),
    verifyOptions: { algorithms: [ 'HS256' ], ignoreExpiration: true }
  });

  next();
};

exports.register.attributes = require('./package');
