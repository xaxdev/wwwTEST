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
]
