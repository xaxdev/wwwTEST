'use strict';

const EventEmitter = require('events').EventEmitter;

exports.register = (server, options, next) => {

  const emitter = new EventEmitter();
  server.decorate('server', 'events', emitter);

  next();
};

exports.register.attributes = require('./package');
