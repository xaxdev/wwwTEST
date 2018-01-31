import * as controllers from './controllers'

export default [
    {
        method: 'GET',
        path: '/names',
        config: controllers.getnames
    },
    {
        method: 'GET',
        path: '/data/{id}/{reference?}',
        config: controllers.getdata
    },
    {
        method: 'POST',
        path: '/',
        config: controllers.save
    },
    {
        method: 'PUT',
        path: '/rename',
        config: controllers.rename
    },
    {
        method: 'DELETE',
        path: '/{id}',
        config: controllers.remove
    },
    {
        method: 'DELETE',
        path: '/item',
        config: controllers.removeitem
    },
    {
        method: 'GET',
        path: '/{id}',
        config: controllers.items
    },
    {
        method: 'GET',
        path: '/exportpdf/{id}',
        config: controllers.exportpdf
    },
    {
        method: 'GET',
        path: '/webnames',
        config: controllers.getnameswithshared
    },
    {
        method: 'GET',
        path: '/webnamessetitem',
        config: controllers.getnameswithsharedsetitem
    },
    {
        method: 'POST',
        path: '/shared',
        config: controllers.saveshared
    },
    {
        method: 'POST',
        path: '/setitem',
        config: controllers.savesetitem
    },
    {
        method: 'GET',
        path: '/namessetitem',
        config: controllers.getnamessetitem
    },
    {
        method: 'GET',
        path: '/datasetitem/{id}/{reference?}',
        config: controllers.getdatasetitem
    },
    {
        method: 'GET',
        path: '/setitem/{id}',
        config: controllers.itemssetitem
    },
    {
        method: 'GET',
        path: '/migrateprice',
        config: controllers.migrateprice
    },
    {
        method: 'POST',
        path: '/setcatalogitem',
        config: controllers.savesetcatalogitem
    },
    {
        method: 'GET',
        path: '/webnamessetcatalog',
        config: controllers.getnameswithsharedcatalog
    },
    {
        method: 'GET',
        path: '/setcatalogitem/{id}',
        config: controllers.itemssetcatalogitem
    },
    {
        method: 'PUT',
        path: '/renameset',
        config: controllers.renameset
    },
    {
        method: 'DELETE',
        path: '/set/{id}',
        config: controllers.removeset
    },
    {
        method: 'POST',
        path: '/sharedset',
        config: controllers.savesharedset
    }
]
