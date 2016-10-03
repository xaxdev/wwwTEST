import Joi from 'joi'
import Boom from 'boom'
import Elasticsearch from 'elasticsearch'
import _ from 'lodash'

export default {
    auth: {
        strategy: 'authentication'
    },
    validate: {
        query: {
            page: Joi.number().integer(),
            size: Joi.number().integer()
        }
    },
    handler: (request, reply) => {

        (async () => {

            const client = new Elasticsearch.Client({
                        host: request.elasticsearch.host,
                        keepAlive: false
                    })
            try {
                const userHelper = request.user
                const helper = request.helper
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID
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
                const items = await db.collection('CatalogItem').find(fCondition, { "_id": 0, "catalogId": 0, "lastModified": 0 })
                                        .sort({ "lastModified": -1 }).limit(size).skip((page - 1) * size).toArray()

                if (!!items.length) {
                    const es = await client.search(request.helper.item.parameters(items))
                    const inventory = await request.helper.item.inventory(items, es)
                    const user = await userHelper.getUserById(request, request.auth.credentials.id)
                    const response = await request.helper.item.authorization(user, inventory)

                    return reply({
                        "_id": new ObjectID(fCatalog._id),
                        "catalog": fCatalog.catalog,
                        "userId": fCatalog.userId,
                        "items": response,
                        "page": page,
                        "total_items": countCatalogItem,
                        "total_pages": Math.ceil(countCatalogItem / size),
                        "status": fCatalog.status
                    })
                } else {
                    return reply({
                        "_id": new ObjectID(fCatalog._id),
                        "catalog": fCatalog.catalog,
                        "userId": fCatalog.userId,
                        "items": [],
                        "page": page,
                        "total_items": countCatalogItem,
                        "total_pages": Math.ceil(countCatalogItem / size),
                        "status": fCatalog.status
                    })
                }
            } catch (e) {
                reply(Boom.badImplementation('', e))
            } finally {
                client && client.close()
            }
        })();
    }
}
