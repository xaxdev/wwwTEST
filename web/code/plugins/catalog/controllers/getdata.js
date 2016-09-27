const Boom = require('boom')
const _ = require('lodash')

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const userHelper = request.user
                const helper = request.helper
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID
                const user = await userHelper.getUserById(request, reply, request.auth.credentials.id)
                const catalogId = request.params.id || ""
                const itemRef = request.params.reference || ""
                const qPage = request.query.page || request.pagination.page
                const qSize = request.query.size || request.pagination.size
                const page = parseInt(qPage)
                const size = parseInt(qSize)

                let fCatalog = await db.collection('CatalogName').findOne({ "_id" : new ObjectID(catalogId) })
                if (_.isNull(fCatalog)) return reply(Boom.badRequest("Invalid item."))

                let fCondition = { "catalogId" : new ObjectID(catalogId) }
                if (!_.isNull(itemRef)) {
                    fCondition = _.assign({ "reference": { "$regex": itemRef, "$options": "i" }}, fCondition)
                }

                const countCatalogItem = await db.collection('CatalogItem').find(fCondition).count()
                const popCatalogItem = await db.collection('CatalogItem').find(fCondition, { "_id": 0, "catalogId": 0, "lastModified": 0 })
                .sort({ "lastModified": -1 })
                .limit(size)
                .skip((page - 1) * size)
                .toArray()
                .then((data) => {
                    if (data.length == 0) {
                        return reply({
                            "_id": new ObjectID(fCatalog._id),
                            "catalog": fCatalog.catalog,
                            "userId": fCatalog.userId,
                            "items": data,
                            "page": page,
                            "total_items": countCatalogItem,
                            "total_pages": Math.ceil(countCatalogItem / size),
                            "status": fCatalog.status
                        })
                    }
                    return data
                })
                .then((data) => {

                    data.map((item) => { item.id = item.itemId })
                    data.forEach((item) => { delete item.itemId })
                    return data
                })
                const esItemData = helper.item.synchronize(request.server.plugins.elastic.client, popCatalogItem)

                esItemData
                .then((data) => {

                    if (data) return helper.item.applyPermission(data, user)
                    return reply(Boom.badRequest("Invalid item."))
                })
                .then((data) => {

                    return reply({
                        "_id": new ObjectID(fCatalog._id),
                        "catalog": fCatalog.catalog,
                        "userId": fCatalog.userId,
                        "items": data,
                        "page": page,
                        "total_items": countCatalogItem,
                        "total_pages": Math.ceil(countCatalogItem / size),
                        "status": fCatalog.status
                    })
                })

            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
