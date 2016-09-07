import * as controllers from './controllers'

export default [
    {
        method: 'GET',
        path: '/',
        config: controllers.history
    },
    {
        method: 'POST',
        path: '/update',
        config: controllers.updatehistory
    }
]
