const Boom = require('boom')

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const db = request.server.plugins['hapi-mongodb'].db
                const ObjectID = request.server.plugins['hapi-mongodb'].ObjectID

                reply(await db.collection('Wishlist').deleteOne({ "_id" : new ObjectID(request.params.id) }))
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
