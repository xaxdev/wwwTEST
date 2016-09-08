import * as controllers from './controllers'

export default [
    {
        method: 'GET',
        path: '/',
        config: controllers.history
    },
    {
        method: 'POST',
        path: '/hide',
        config: controllers.hidehistory
    }
]
