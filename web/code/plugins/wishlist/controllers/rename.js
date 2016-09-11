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

                var findExist = await db.collection('Wishlist').find({ "_id" : new ObjectID(request.payload.id), "wishlist": request.payload.wishlist }).toArray()
                if (findExist.length) {
                    reply({
                        "status": false,
                        "message": "Your require name is existing."
                    })
                }
                else {
                    await db.collection('Wishlist').updateOne({ "_id" : new ObjectID(request.payload.id) }, { $set: { "wishlist": request.payload.wishlist } })
                    reply({
                        "status": true
                    })
                }
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
