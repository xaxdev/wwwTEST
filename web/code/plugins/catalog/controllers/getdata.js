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

                let catalogName = await db.collection('CatalogName').findOne({ "_id" : new ObjectID(request.params.id) })
                let catalogItems = await db.collection('CatalogItem').find({ "catalogId" : new ObjectID(request.params.id) }, { "itemId": 1 }).toArray()
                let dataItems = await db.collection('Items').find({ "id": { $in: _.map(catalogItems, "itemId") } }).toArray()

                reply({
                    "_id": new ObjectID(catalogName._id),
                    "catalog": catalogName.catalog,
                    "userId": catalogName.userId,
                    "items": dataItems.slice((page - 1) * size, page * size),
                    "page": parseInt(page),
                    "total_items": dataItems.length,
                    "total_pages": Math.ceil(dataItems.length / size),
                    "status": true
                })
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
