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

            const userHelper = request.user
            const helper = request.helper
            const display = request.params.display || "ACTIVE"
            const itemRef = request.params.reference || ""
            const qPage = request.query.page || request.pagination.page
            const qSize = request.query.size || request.pagination.size
            const page = parseInt(qPage)
            const size = parseInt(qSize)

            let fCondition = { "userId": request.auth.credentials.id }

            if (display != undefined) {
                switch(display.toUpperCase()){
                    case "ALL":
                        fCondition = fCondition
                        break;
                    case "ACTIVE":
                        fCondition = _.assign({ "displayStatus": true }, fCondition)
                        break;
                    case "DEACTIVE":
                        fCondition = _.assign({ "displayStatus": false }, fCondition)
                        break;
                    default:
                        fCondition = _.assign({ "displayStatus": true }, fCondition)
                }
            }

            if (itemRef) {
                fCondition = _.assign({ "reference": { "$regex": itemRef, "$options": "i" }}, fCondition)
            }

            const client = new Elasticsearch.Client({
                            host: request.elasticsearch.host,
                            keepAlive: false
                        })
            try {
                const db = request.mongo.db
                const user = await userHelper.getUserById(request, request.auth.credentials.id)
                const countHistory = await db.collection('History').find(fCondition).count()
                const items = await db.collection('History').find(fCondition, { _id: 0, "id": 1, "name": 1, "reference": 1 })
                                        .sort({ "lastModified": -1 }).limit(size).skip((page - 1) * size).toArray()

                if (!!items.length) {
                    const es = await client.search(request.helper.item.parameters(items))
                    const inventory = await request.helper.item.inventory(items, es)
                    const user = await userHelper.getUserById(request, request.auth.credentials.id)
                    const response = await request.helper.item.authorization(user, inventory)

                    return reply({
                        "items": response,
                        "page": page,
                        "total_items": countHistory,
                        "total_pages": Math.ceil(countHistory / size),
                        "status": true
                    })
                } else {
                    return reply({
                        "items": [],
                        "page": page,
                        "total_items": countHistory,
                        "total_pages": Math.ceil(countHistory / size),
                        "status": true
                    })
                }

                return reply({
                    "items": esItemData,
                    "page": page,
                    "total_items": countHistory,
                    "total_pages": Math.ceil(countHistory / size),
                    "status": true
                })

            } catch (e) {
                reply(Boom.badImplementation('', e))
            } finally {
                client && client.close()
            }
        })();
    }
}
