'use strict';

exports.register = (server, options, next) => {
    next();
};

exports.register.attributes = require('./package');
