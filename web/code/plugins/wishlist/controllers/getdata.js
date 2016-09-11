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
                const ObjectID = request.server.plugins['hapi-mongodb'].ObjectID
                const page = request.params.page || 1
                const size = 8

                let data = await db.collection('Wishlist').findOne({ "_id" : new ObjectID(request.params.id) })

                reply({
                    "_id": new ObjectID(data._id),
                    "wishlist": data.wishlist,
                    "userId": data.userId,
                    "items": data.items.slice((page - 1) * size, page * size),
                    "page": parseInt(page),
                    "total_items": data.items.length,
                    "total_pages": Math.ceil(data.items.length / size),
                    "status": true
                })
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
