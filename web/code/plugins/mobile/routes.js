import * as controllers from './controllers'

export default [
    {
        method: 'GET',
        path: '/history',
        config: controllers.history
    },
    {
        method: 'GET',
        path: '/reference/{reference}',
        config: controllers.searchreference
    }
]
