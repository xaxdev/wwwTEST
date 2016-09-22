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
                const db = request.server.plugins['hapi-mongodb'].db
                const ObjectID = request.server.plugins['hapi-mongodb'].ObjectID
                const wlistPayload = request.payload
                const wlistPayloadId = request.payload.id
                const wlistPayloadItems = request.payload.items
                const helper = request.helper
                const esItemData = helper.item.synchronize(request.server.plugins.elastic.client, wlistPayloadItems)

                let wlistName = {
                    "wishlist": request.payload.wishlist,
                    "userId": request.auth.credentials.id,
                    "status": true,
                    "updatedDate": _.now()
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
                                "wishlistId": wlistData._id, "itemId": item.id, "reference": item.reference, "description": item.description, "updatedDate": _.now()
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
                            { $set: { "reference": item.reference, "description": item.description, "updatedDate": _.now() }},
                            { new: true, upsert: true });
                        })
                    })
                    .catch((err) => {

                        reply(Boom.badImplementation('', err))
                    })
                }

                reply({ "status": true })
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
