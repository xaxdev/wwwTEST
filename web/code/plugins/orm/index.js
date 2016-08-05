'use strict';

const Glob = require('glob');
const Hoek = require('hoek');
const Path = require('path');

exports.register = (server, options, next) => {

  let models = [];

  Glob('./plugins/**/model.js', (err, files) => {

    Hoek.assert(!err, err);

    files.map((file) => {

      models.push(require(Path.resolve(file)));
    });

    options.models = models;

    server.register({
      register: require('dogwater'),
      options: options
    }, (err) => {

      Hoek.assert(!err, err);
    });

    next();
  });
}

exports.register.attributes = require('./package');
