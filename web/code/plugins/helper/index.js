import pkg from './package'
import * as lib from './lib/'

const register = (server, options, next) => {

    server.decorate('request', 'helper', lib)

    next()
}

register.attributes = { pkg }

export { register }
