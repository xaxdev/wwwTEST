import pkg from './package'
import routes from './routes'

const register = (server, options, next) => {

    server.route(routes)

    next()
}

register.attributes = { pkg }

export { register }
