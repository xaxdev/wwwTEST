'use strict';

const Elasticsearch = require('elasticsearch');

const internals = {};

exports.register = (server, options, next) => {

  internals.client = new Elasticsearch.Client({
    host: options.host
  });

  server.expose({
    client: internals.client
  });

  next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
