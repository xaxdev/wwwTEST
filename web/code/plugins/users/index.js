'use strict';

import helper from './lib/helper'

exports.register = (server, options, next) => {

    server.route(require('./routes'));

    server.decorate('request', 'user', helper)

    next();
};

exports.register.attributes = require('./package');
