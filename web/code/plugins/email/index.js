'use strict';

exports.register = (server, options, next) => {

  const email = {
    sendgrid: require('sendgrid')(options.user, options.password),
    configuration: {
      reset: options.reset
    }
  };

  server.decorate('request', 'email', email);

  next();
};

exports.register.attributes = require('./package');
