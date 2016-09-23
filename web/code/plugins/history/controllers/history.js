const Boom = require('boom')
const _ = require('lodash')

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async () => {

            const userHelper = request.user
            const helper = request.helper
            const display = request.params.display || "ACTIVE"
            const itemRef = request.params.reference || ""
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

            if (itemRef) {
                fCondition = _.assign({ "reference": { "$regex": itemRef, "$options": "i" }}, fCondition)
            }

            try {
                const db = request.server.plugins['hapi-mongodb'].db
                const user = await userHelper.getUserById(request, reply, request.auth.credentials.id)
                const countHistory = await db.collection('History').find(fCondition).count()
                const popHistory = await db.collection('History').find(fCondition, { _id: 0, "itemId": 1, "name": 1, "reference": 1 })
                .sort({ "updatedDate": -1 })
                .limit(size)
                .skip((page - 1) * size)
                .toArray()
                .then((data) => {
                    if (data.length == 0) {
                        return reply({
                            "items": data,
                            "page": parseInt(page),
                            "total_items": countHistory,
                            "total_pages": Math.ceil(countHistory / size),
                            "status": true
                        })
                    }
                    return data;
                })
                .then((data) => {
                    data.forEach((item) => {
                        item.id = item.itemId
                    })
                    return data
                })
                const esItemData = helper.item.synchronize(request.server.plugins.elastic.client, popHistory)

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
                .then((data) => {

                    return reply({
                        "items": data,
                        "page": parseInt(page),
                        "total_items": countHistory,
                        "total_pages": Math.ceil(countHistory / size),
                        "status": true
                    })
                })

            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
