import * as controllers from './controllers'

export default [
    {
        method: 'GET',
        path: '/',
        config: controllers.history
    },
    {
        method: 'PATCH',
        path: '/hide',
        config: controllers.hidehistory
    }
]
