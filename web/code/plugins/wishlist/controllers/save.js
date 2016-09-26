const Promise = require('bluebird');
const Boom = require('boom')
const _ = require('lodash')

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID
                const wlistPayload = request.payload
                const wlistPayloadId = request.payload.id
                const wlistPayloadItems = request.payload.items
                const helper = request.helper
                const esItemData = helper.item.synchronize(request.server.plugins.elastic.client, wlistPayloadItems)

                let wlistName = {
                    "wishlist": request.payload.wishlist,
                    "userId": request.auth.credentials.id,
                    "status": true,
                    "lastModified": new Date()
                }

                if (_.isNull(wlistPayloadId)) {

                    const addWishlist = db.collection('WishlistName').insertOne(wlistName)
                    .then((result) => {
                        return db.collection('WishlistName').findOne(wlistName)
                    })

                    Promise.all([addWishlist, esItemData])
                    .spread((wlistData, itemData) => {

                        itemData.forEach((item) => {

                            db.collection('WishlistItem').insertOne({
                                "wishlistId": wlistData._id, "itemId": item.id, "reference": item.reference, "description": item.description, "lastModified": new Date()
                            })
                        })
                    })
                    .catch((err) => {

                        reply(Boom.badImplementation('', err))
                    })
                }
                else {

                    esItemData
                    .then((itemData) => {

                        itemData.forEach((item) => {

                            db.collection('WishlistItem').findAndModify({
                                "wishlistId": new ObjectID(wlistPayloadId), "itemId": item.id.toString()
                            },
                            [['itemId', 1]],
                            { $set: { "reference": item.reference, "description": item.description, "lastModified": new Date() }},
                            { new: true, upsert: true });
                        })
                    })
                    .catch((err) => {

                        reply(Boom.badImplementation('', err))
                    })
                }

                reply.success()
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
