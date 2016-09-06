import * as controllers from './controllers'

export default [
    {
        method: 'GET',
        path: '/history',
        config: controllers.history
    },
    {
        method: 'POST',
        path: '/updatehistory',
        config: controllers.updatehistory
    }
]
