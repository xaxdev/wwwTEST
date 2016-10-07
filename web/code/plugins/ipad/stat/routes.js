import controllers from './controllers'

export default [
    {
        method: 'GET',
        path: '/count',
        config: controllers.count
    }
]
