const Boom = require('boom')

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async _ => {

            try {
                const db = request.server.plugins['hapi-mongodb'].db
                reply(await db.collection('History').updateOne({ "userId": request.auth.credentials.id, "id": request.payload.id.toString().trim() }, { $set: { "displayStatus": false } }))
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
