import Joi from 'joi'
import Boom from 'boom'
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

            try {
                const db = request.mongo.db
                const user = await userHelper.getUserById(request, request.auth.credentials.id)
                const countHistory = await db.collection('History').find(fCondition).count()
                const popHistory = await db.collection('History').find(fCondition, { _id: 0, "itemId": 1, "name": 1, "reference": 1 })
                .sort({ "lastModified": -1 })
                .limit(size)
                .skip((page - 1) * size)
                .toArray()
                .then((data) => {
                    if (data.length == 0) {
                        return reply({
                            "items": data,
                            "page": page,
                            "total_items": countHistory,
                            "total_pages": Math.ceil(countHistory / size),
                            "status": true
                        })
                    }
                    return data;
                })
                .then((data) => {

                    data.map((item) => { item.id = item.itemId })
                    data.forEach((item) => { delete item.itemId })
                    return data
                })
                const esItemData = await request.helper.item.parse(popHistory, user, request.elasticsearch)

                if (!esItemData) return reply(Boom.badRequest("Invalid item."))

                return reply({
                    "items": esItemData,
                    "page": page,
                    "total_items": countHistory,
                    "total_pages": Math.ceil(countHistory / size),
                    "status": true
                })

            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
