'use strict';

const Elasticsearch = require('elasticsearch');

const internals = {};

exports.register = (server, options, next) => {

    internals.client = new Elasticsearch.Client({
        host: options.host,
        keepAlive: true,
        maxSockets: 20
    });

    server.decorate('request', 'elasticsearch', internals.client);

    server.expose({
        client: internals.client
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
