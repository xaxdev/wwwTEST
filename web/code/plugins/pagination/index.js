import pkg from './package'

const register = (server, options, next) => {

    server.decorate('request', 'pagination', options)

    next()
}

register.attributes = { pkg }

export { register }
