'use strict';

const Path = require('path');

const controllers = require('require-all')(Path.normalize(__dirname + '/controllers'));

module.exports = [
    {
        method: 'GET',
        path: '/',
        config: controllers.masterdata
    },
    {
        method: 'GET',
        path: '/soldmasterdata',
        config: controllers.soldmasterdata
    }
];
