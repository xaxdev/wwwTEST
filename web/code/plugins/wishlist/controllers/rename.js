import Boom from 'boom'

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID

                var findExist = await db.collection('WishlistName').find({ "_id" : new ObjectID(request.payload.id), "wishlist": request.payload.wishlist }).toArray()
                if (findExist.length) {
                    reply(Boom.badRequest("Your require name is existing."))
                }
                else {
                    await db.collection('WishlistName').updateOne({ "_id" : new ObjectID(request.payload.id) }, { $set: { "wishlist": request.payload.wishlist } })
                    reply.success()
                }
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
