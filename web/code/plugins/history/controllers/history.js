const Boom = require('boom')
const _ = require('lodash')

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async () => {

            const history = request.history;
            const display = request.params.display || "ACTIVE"
            const page = request.params.page || 1
            const size = 8

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

            try {
                const db = request.server.plugins['hapi-mongodb'].db
                const user = await history.getUserById(request, reply, request.auth.credentials.id)

                db.collection('History')
                .find(fCondition)
                .sort({ "lookUpDate": -1 })
                .toArray()
                .then((data) => {

                    if (data) {
                        let itemsCondition = { "id": { $in: _.map(data, "itemId") }}
                        if (user.permission.onhandLocation.places.length != 0) {
                            itemsCondition = _.assign({ "site": { $in: user.permission.onhandLocation.places }}, itemsCondition)
                        }
                        if (user.permission.onhandWarehouse.places.length != 0) {
                            itemsCondition = _.assign({ "warehouse": { $in: user.permission.onhandWarehouse.places }}, itemsCondition)
                        }

                        return db.collection('Items')
                        .find(itemsCondition)
                        .toArray()
                        .then((data) => {

                            if (!_.isNull(data)) {
                                data.forEach((item) => {

                                    item.actualCost = _.hasIn(item.actualCost, user.currency) ? _.result(item.actualCost, user.currency) : 0
                                    item.updatedCost = _.hasIn(item.updatedCost, user.currency) ? _.result(item.updatedCost, user.currency) : 0
                                    item.price = _.hasIn(item.price, user.currency) ? _.result(item.price, user.currency) : 0

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
                    }

                    return reply(Boom.badRequest("Invalid item."))
                })
                .then((data) => {

                    return reply({
                        "status": true,
                        "page": parseInt(page),
                        "total_items": data.length,
                        "total_pages": Math.ceil(data.length / size),
                        "items": data.slice((page - 1) * size, page * size)
                    })
                })

            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
