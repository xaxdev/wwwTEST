'use strict';

const amqp = require('amqplib/callback_api');

const internals = {};

exports.register = (server, options, next) => {

    server.decorate('request', 'amqp', { host: options.host, channelExcel: options.channelExcel,
                                        channelPdf: options.channelPdf, channelWord: options.channelWord });

    server.expose({
        host: options.host,
        channelExcel: options.channelExcel,
        channelPdf: options.channelPdf,
        channelWord: options.channelWord
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
