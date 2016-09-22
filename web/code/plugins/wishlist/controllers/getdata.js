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
                const db = request.server.plugins['hapi-mongodb'].db
                const ObjectID = request.server.plugins['hapi-mongodb'].ObjectID
                const user = await userHelper.getUserById(request, reply, request.auth.credentials.id)
                const page = request.params.page || 1
                const size = 8

                let fWishlist = await db.collection('WishlistName').findOne({ "_id" : new ObjectID(request.params.id) })
                if (_.isNull(fWishlist)) return reply(Boom.badRequest("Invalid item."))

                const countWlistItem = await db.collection('WishlistItem').find({ "wishlistId" : new ObjectID(request.params.id) }).count()
                const popWlistItem = await db.collection('WishlistItem').find({ "wishlistId" : new ObjectID(request.params.id) }, { "_id": 0, "wishlistId": 0 })
                .sort({ "updatedDate": -1 })
                .limit(size)
                .skip((page - 1) * size)
                .toArray()
                .then((data) => {
                    data.forEach((item) => {
                        item.id = item.itemId
                        delete item.itemId
                    })
                    return data
                })
                const esItemData = helper.item.synchronize(request.server.plugins.elastic.client, popWlistItem)

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
                        "_id": new ObjectID(fWishlist._id),
                        "wishlist": fWishlist.wishlist,
                        "userId": fWishlist.userId,
                        "items": data,
                        "page": parseInt(page),
                        "total_items": countWlistItem,
                        "total_pages": Math.ceil(countWlistItem / size),
                        "status": fWishlist.status
                    })
                })

            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
