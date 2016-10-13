'use strict';

const amqp = require('amqplib/callback_api');

const internals = {};

exports.register = (server, options, next) => {

    server.decorate('request', 'amqp', { host: options.host, channel: options.channel });

    server.expose({
        host: options.host,
        channel: options.channel
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
