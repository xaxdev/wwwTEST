'use strict';

require('babel-register')();

const Confidence = require('confidence');
const Glue = require('glue');
const Hoek = require('hoek');

const internals = {};

internals.store = new Confidence.Store(require('./configuration'));
internals.manifest = internals.store.get('/', { env: process.env.NODE_ENV || 'development' });
internals.options = {
  relativeTo: __dirname
};

// console.log(internals.manifest.connections);
internals.init = () => {

  Glue.compose(internals.manifest, internals.options, (err, server) => {

    if (err) {
        throw err;
    }

    server.start(() => {

      // add http port to api
      const api = server.select('api');
      const connection = internals.manifest.connections.find(connection => {

        return Hoek.contain(connection.labels, 'http');
      });
      api.settings.app = Hoek.merge(api.settings.app, { port: connection.port });

      console.log('Servers are started');
    });
  });
};

internals.init();
