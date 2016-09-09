const Boom = require('boom')

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async _ => {

            try {
                const db = request.server.plugins['hapi-mongodb'].db
                reply(await db.collection('History').find({ "userId": request.auth.credentials.id }).toArray())
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
