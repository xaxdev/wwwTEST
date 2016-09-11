import pkg from './package'
import routes from './routes'
// import helper from './lib/helper'

const register = (server, options, next) => {

    server.route(routes)

    // server.decorate('request', 'history', helper)

    next()
}

register.attributes = { pkg }

export { register }
