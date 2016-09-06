'use strict';

const Path = require('path');

const controllers = require('require-all')(Path.normalize(__dirname + '/controllers'));

module.exports = [
  {
    method: 'POST',
    path: '/export',
    config: controllers.export
  },
  {
    method: 'POST',
    path: '/search',
    config: controllers.search
  },
  {
    method: 'GET',
    path: '/relateditems/{collection}/{page}/{productId}/{dominant}/{currency}/{price}',
    config: controllers.relateditems
  },
  {
    method: 'GET',
    path: '/{id}',
    config: controllers.item
  },
  {
    method: 'GET',
    path: '/setreference/{setReference}/{productId}',
    config: controllers.setreference
  }
];
