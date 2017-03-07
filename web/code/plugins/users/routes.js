'use strict';

const Path = require('path');

const controllers = require('require-all')(Path.normalize(__dirname + '/controllers'));

module.exports = [
  {
    method: 'GET',
    path: '/exist',
    config: controllers.validate.exist
  },
  {
    method: 'GET',
    path: '/',
    config: controllers.retrieve.multiple
  },
  {
    method: 'PUT',
    path: '/',
    config: controllers.register
  },
  {
    method: 'POST',
    path: '/login',
    config: controllers.login
  },
  {
    method: 'POST',
    path: '/forgot',
    config: controllers.reset.generate
  },
  {
    method: 'GET',
    path: '/reset/{token}',
    config: controllers.reset.validate
  },
  {
    method: 'POST',
    path: '/reset',
    config: controllers.reset.update
  },
  {
    method: 'GET',
    path: '/{id}',
    config: controllers.retrieve.one
  },
  {
    method: 'POST',
    path: '/{id}',
    config: controllers.update
  },
  {
    method: 'GET',
    path: '/search/{name}',
    config: controllers.search
  }
];
