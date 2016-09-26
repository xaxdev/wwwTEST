import pkg from './package'
import * as lib from './lib/'

const register = (server, options, next) => {

    server.decorate('request', 'helper', lib)
    server.decorate('reply', 'success', function () {
        return this.response({ status: true })
    })

    next()
}

register.attributes = { pkg }

export { register }
