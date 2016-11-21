'use strict';

const amqp = require('amqplib/callback_api');

const internals = {};

exports.register = (server, options, next) => {

    server.decorate('request', 'amqp', { host: options.host, channelExcel: options.channelExcel,
                                        channelPdf: options.channelPdf });

    server.expose({
        host: options.host,
        channelExcel: options.channelExcel,
        channelPdf: options.channelPdf
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
