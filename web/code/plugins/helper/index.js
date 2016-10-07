import Boom from 'boom'
import pkg from './package'
import * as lib from './lib/'

const register = (server, options, next) => {

    server.decorate('request', 'helper', lib)

    server.decorate('reply', 'success', function () {
        return this.response({ status: true })
    })

    server.decorate('reply', 'invalidItems', function (items) {
        const error = Boom.create(490, 'Some items are no longer valid.')
        error.output.payload.items = items
        return this.response(error)
    })

    next()
}

register.attributes = { pkg }

export { register }
