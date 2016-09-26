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
                const page = request.params.page || 1
                const size = 8

                let fCatalog = await db.collection('CatalogName').findOne({ "_id" : new ObjectID(catalogId) })
                if (_.isNull(fCatalog)) return reply(Boom.badRequest("Invalid item."))

                let fCondition = { "catalogId" : new ObjectID(catalogId) }
                if (!_.isNull(itemRef)) {
                    fCondition = _.assign({ "reference": { "$regex": itemRef, "$options": "i" }}, fCondition)
                }

                const countCatalogItem = await db.collection('CatalogItem').find(fCondition).count()
                const popCatalogItem = await db.collection('CatalogItem').find(fCondition, { "_id": 0, "catalogId": 0 })
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
                            "page": parseInt(page),
                            "total_items": countCatalogItem,
                            "total_pages": Math.ceil(countCatalogItem / size),
                            "status": fCatalog.status
                        })
                    }
                    return data
                })
                .then((data) => {
                    data.forEach((item) => {
                        item.id = item.itemId
                        delete item.itemId
                    })
                    return data
                })
                const esItemData = helper.item.synchronize(request.server.plugins.elastic.client, popCatalogItem)

                esItemData
                .then((data) => {

                    if (data) {
                        let itemsCondition = { "id": { $in: _.map(data, "itemId") }}
                        if (user.permission.onhandLocation.places.length != 0) {
                            itemsCondition = _.assign({ "site": { $in: user.permission.onhandLocation.places }}, itemsCondition)
                        }
                        if (user.permission.onhandWarehouse.places.length != 0) {
                            itemsCondition = _.assign({ "warehouse": { $in: user.permission.onhandWarehouse.places }}, itemsCondition)
                        }

                        data.forEach((item) => {

                            item.actualCost = _.hasIn(item.actualCost, user.currency) ? _.result(item.actualCost, user.currency) : -1
                            item.updatedCost = _.hasIn(item.updatedCost, user.currency) ? _.result(item.updatedCost, user.currency) : -1
                            item.price = _.hasIn(item.price, user.currency) ? _.result(item.price, user.currency) : -1

                            switch (user.permission.price.toUpperCase()) {
                                case "PUBLIC":
                                    delete item.actualCost
                                    delete item.updatedCost
                                    break;
                                case "UPDATED":
                                    delete item.actualCost
                                    break;
                            }
                        })

                        return data;
                    }

                    return reply(Boom.badRequest("Invalid item."))
                })
                .then((data) => {

                    return reply({
                        "_id": new ObjectID(fCatalog._id),
                        "catalog": fCatalog.catalog,
                        "userId": fCatalog.userId,
                        "items": data,
                        "page": parseInt(page),
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
