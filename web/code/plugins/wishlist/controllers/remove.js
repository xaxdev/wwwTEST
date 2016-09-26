const Boom = require('boom')

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID

                await db.collection('WishlistName').deleteOne({ "_id" : new ObjectID(request.params.id) })
                await db.collection('WishlistItem').deleteMany({ "wishlistId" : new ObjectID(request.params.id) })
                reply.success()
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
