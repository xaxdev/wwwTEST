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
                const catalogPayload = request.payload
                const catalogPayloadId = request.payload.id
                const catalogPayloadItems = request.payload.items
                const item = request.item

                let catalogName = {
                    "catalog": request.payload.catalog,
                    "userId": request.auth.credentials.id,
                    "updatedDate": _.now()
                }

                if (_.isNull(catalogPayloadId)) {
                    db.collection('CatalogName').insertOne(catalogName, function(err, r) {

                        db.collection('CatalogName').findOne(catalogName, function(err, r) {

                            catalogPayloadItems.forEach(({id}) => {

                                db.collection('CatalogItem').insertOne({ "catalogId": r._id, "updatedDate": _.now(), "itemId": id })
                            })
                        })
                    })
                }
                else {
                    catalogPayloadItems.forEach(({id}) => {

                        db.collection('CatalogItem').findAndModify({ "catalogId": new ObjectID(catalogPayloadId), "itemId": id.toString() },
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
