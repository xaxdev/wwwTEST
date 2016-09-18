const Boom = require('boom')
const _ = require('lodash')

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const wishlist = request.wishlist
                const db = request.server.plugins['hapi-mongodb'].db
                const ObjectID = request.server.plugins['hapi-mongodb'].ObjectID
                const user = await wishlist.getUserById(request, reply, request.auth.credentials.id)
                const page = request.params.page || 1
                const size = 8

                let wlistName = await db.collection('WishlistName').findOne({ "_id" : new ObjectID(request.params.id) })
                if (_.isNull(wlistName)) return reply(Boom.badRequest("Invalid item."))

                db.collection('WishlistItem')
                .find({ "wishlistId" : new ObjectID(request.params.id) }, { "itemId": 1 })
                .sort({ "updatedDate": -1 })
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
                        })
                    }
                })
                .then((data) => {

                    return reply({
                        "_id": new ObjectID(wlistName._id),
                        "wishlist": wlistName.wishlist,
                        "userId": wlistName.userId,
                        "items": data.slice((page - 1) * size, page * size),
                        "page": parseInt(page),
                        "total_items": data.length,
                        "total_pages": Math.ceil(data.length / size),
                        "status": true
                    })
                })

            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
