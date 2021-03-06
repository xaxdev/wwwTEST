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
    }
]
