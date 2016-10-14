import controllers from './controllers'

export default [
    {
        method: 'GET',
        path: '/',
        config: controllers.retrieve
    },
    {
        method: 'POST',
        path: '/',
        config: controllers.insert
    },
    {
        method: 'DELETE',
        path: '/',
        config: controllers.remove
    }
]
