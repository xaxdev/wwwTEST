'use strict';

const Path = require('path');

const controllers = require('require-all')(Path.normalize(__dirname + '/controllers'));

module.exports = [
    {
        method: 'POST',
        path: '/searchpdf',
        config: controllers.searchpdf
    },
    {
        method: 'POST',
        path: '/salessearchpdf',
        config: controllers.salessearchpdf
    },
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
        method: 'POST',
        path: '/salessearch',
        config: controllers.salessearch
    },
    {
        method: 'POST',
        path: '/salessetreference',
        config: controllers.salessetreference
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
        method: 'POST',
        path: '/salessearch/save',
        config: controllers.salessearchsave
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
        method: 'DELETE',
        path: '/salessearch/remove',
        config: controllers.salessearchdelete
    },
    {
        method: 'POST',
        path: '/search/share',
        config: controllers.searchshare
    },
    {
        method: 'POST',
        path: '/salessearch/share',
        config: controllers.salessearchshare
    },
    {
        method: 'GET',
        path: '/search/view/{id}',
        config: controllers.searchview
    },
    {
        method: 'GET',
        path: '/salessearch/view/{id}',
        config: controllers.salessearchview
    },
    {
        method: 'GET',
        path: '/search/edit/{id}',
        config: controllers.searchedit
    },
    {
        method: 'POST',
        path: '/salesitem/{id}',
        config: controllers.salesitem
    },
    {
        method: 'GET',
        path: '/salesviewassetitem/{id}',
        config: controllers.salesviewassetitem
    },
    {
        method: 'GET',
        path: '/salesrelateditems/{collection}/{page}/{productId}/{dominant}/{currency}/{price}',
        config: controllers.salesrelateditems
    },
    {
        method: 'GET',
        path: '/salessetdetails/{setReference}',
        config: controllers.salessetdetails
    },
    {
        method: 'GET',
        path: '/salesviewassetdetails/{setReference}',
        config: controllers.salesviewassetdetails
    },
    {
        method: 'POST',
        path: '/export/sales',
        config: controllers.salesexport
    },
    {
        method: 'POST',
        path: '/savetitle',
        config: controllers.savetitle
    }
];
