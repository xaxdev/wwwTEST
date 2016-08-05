'use strict';

const Path = require('path');

const controller = require('require-all')(Path.normalize(__dirname + '/controllers'));

module.exports = [
  {
    method: 'GET',
    path: '/css/{path*}',
    config: controller.assets.css
  },
  {
    method: 'GET',
    path: '/fonts/{path*}',
    config: controller.assets.fonts
  },
  {
    method: 'GET',
    path: '/js/{path*}',
    config: controller.assets.js
  },
  {
    method: 'GET',
    path: '/images/{path*}',
    config: controller.assets.images
  },
  {
    method: 'GET',
    path: '/{path*}',
    handler: {
      file: Path.join(__dirname, 'index.htm')
    }
  }
];
