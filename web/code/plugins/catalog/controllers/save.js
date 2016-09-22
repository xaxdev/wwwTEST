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
                const helper = request.helper
                const esItemData = helper.item.synchronize(request.server.plugins.elastic.client, catalogPayloadItems)

                let catalogName = {
                    "catalog": request.payload.catalog,
                    "userId": request.auth.credentials.id,
                    "status": true,
                    "updatedDate": _.now()
                }

                if (_.isNull(catalogPayloadId)) {

                    const addCatalog = db.collection('CatalogName').insertOne(catalogName)
                    .then((result) => {
                        return db.collection('CatalogName').findOne(catalogName)
                    })

                    Promise.all([addCatalog, esItemData])
                    .spread((catalogData, itemData) => {

                        itemData.forEach((item) => {

                            db.collection('CatalogItem').insertOne({
                                "catalogId": catalogData._id, "itemId": item.id, "reference": item.reference, "name": item.name, "updatedDate": _.now()
                            })
                        })
                    })
                    .catch((err) => {

                        reply(Boom.badImplementation('', err))
                    })
                }
                // else {
                //
                //     esItemData
                //     .then((itemData) => {
                //
                //         itemData.forEach(({id}) => {
                //
                //             db.collection('CatalogItem').findAndModify({
                //                 "catalogId": new ObjectID(catalogPayloadId), "itemId": id.toString()
                //             },
                //             [['itemId', 1]],
                //             { $set: { "reference": item.reference, "name": item.name, "updatedDate": _.now() }},
                //             { new: true, upsert: true });
                //         })
                //     })
                //     .catch((err) => {
                //
                //         reply(Boom.badImplementation('', err))
                //     })
                // }

                reply({ "status": true })
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
