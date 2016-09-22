const Boom = require('boom')
const _ = require('lodash')

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const db = request.server.plugins['hapi-mongodb'].db
                reply(await db.collection('CatalogName').find({ "userId": request.auth.credentials.id }).sort({ "catalog": 1 }).toArray())
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
