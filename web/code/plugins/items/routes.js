'use strict';

const Path = require('path');

const controllers = require('require-all')(Path.normalize(__dirname + '/controllers'));

module.exports = [
    {
        method: 'POST',
        path: '/writehtml',
        config: controllers.writehtml
    },
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
    },
    {
        method: 'GET',
        path: '/setdetails/{setReference}',
        config: controllers.setdetails
    },
    {
        method: 'POST',
        path: '/certificate/{productId}',
        config: controllers.certificate
    },
    {
        method: 'POST',
        path: '/lotnumber',
        config: controllers.lotnumber
    },
    {
        method: 'POST',
        path: '/movement',
        config: controllers.movement
    },
    {
        method: 'POST',
        path: '/search/save',
        config: controllers.searchsave
    },
    {
        method: 'GET',
        path: '/search/list',
        config: controllers.searchlist
    },
    {
        method: 'DELETE',
        path: '/search/remove',
        config: controllers.searchdelete
    },
    {
        method: 'POST',
        path: '/search/share',
        config: controllers.searchshare
    },
    {
        method: 'GET',
        path: '/search/view/{id}',
        config: controllers.searchview
    },
    {
        method: 'GET',
        path: '/search/edit/{id}',
        config: controllers.searchedit
    }
];
