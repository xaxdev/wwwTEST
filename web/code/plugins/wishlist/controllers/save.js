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
                const item = request.item

                let wlistName = {
                    "wishlist": request.payload.wishlist,
                    "userId": request.auth.credentials.id,
                    "updatedDate": _.now()
                }

                if (_.isNull(wlistPayloadId)) {
                    db.collection('WishlistName').insertOne(wlistName, function(err, r) {

                        db.collection('WishlistName').findOne(wlistName, function(err, r) {

                            wlistPayloadItems.forEach(({id}) => {

                                db.collection('WishlistItem').insertOne({ "wishlistId": r._id, "updatedDate": _.now(), "itemId": id })
                            })
                        })
                    })
                }
                else {
                    wlistPayloadItems.forEach(({id}) => {

                        db.collection('WishlistItem').findAndModify({"wishlistId": new ObjectID(wlistPayloadId), "itemId": id.toString() },
                            [['itemId', 1]],
                            { $set: { "updatedDate": _.now() }},
                            { new: true, upsert: true });
                    })
                }

                reply({ "status": true })
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
