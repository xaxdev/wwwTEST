import * as controllers from './controllers'

export default [
    {
        method: 'GET',
        path: '/{display}/{page}',
        config: controllers.history
    },
    {
        method: 'PUT',
        path: '/hide',
        config: controllers.hidehistory
    }
]
