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
                const items = request.payload.items

                items.forEach(({id}) => {

                    db.collection('WishlistItem').deleteMany({ "wishlistId": new ObjectID(request.payload.id), "itemId": id.toString() }, (err, result) => {
                        if (err) reply(Boom.badImplementation('', err))
                    })
                })
                reply.success()
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
