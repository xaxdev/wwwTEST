'use strict';

import * as controllers from './controllers'

module.exports = [
    {
        method: 'GET',
        path: '/',
        config: controllers.get.all
    },
    {
        method: 'GET',
        path: '/{id}',
        config: controllers.get.id
    },
    {
        method: 'GET',
        path: '/search',
        config: controllers.get.some
    },
    {
        method: 'POST',
        path: '/',
        config: controllers.insert
    },
    {
        method: 'PUT',
        path: '/',
        config: controllers.update
    },
    {
        method: 'PUT',
        path: '/{id}',
        config: controllers.disable
    },
    {
        method: 'POST',
        path: '/exportexcel',
        config: controllers.exportexcel
    }
];
