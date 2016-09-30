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

            try {
                const userHelper = request.user
                const helper = request.helper
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID
                const user = await userHelper.getUserById(request, request.auth.credentials.id)
                const wlistId = request.params.id || ""
                const itemRef = request.params.reference || ""
                const qPage = request.query.page || request.pagination.page
                const qSize = request.query.size || request.pagination.size
                const page = parseInt(qPage)
                const size = parseInt(qSize)

                let fWishlist = await db.collection('WishlistName').findOne({ "_id" : new ObjectID(wlistId) })
                if (_.isNull(fWishlist)) {
                    return reply(Boom.badRequest("Invalid item."))
                }

                let fCondition = { "wishlistId" : new ObjectID(wlistId) }
                if (itemRef) {
                    fCondition = _.assign({ "reference": { "$regex": itemRef, "$options": "i" }}, fCondition)
                }

                const countWlistItem = await db.collection('WishlistItem').find(fCondition).count()
                const popWlistItem = await db.collection('WishlistItem').find(fCondition, { "_id": 0, "wishlistId": 0, "lastModified": 0 })
                .sort({ "lastModified": -1 })
                .limit(size)
                .skip((page - 1) * size)
                .toArray()
                .then((data) => {
                    if (data.length == 0) {
                        return reply({
                            "_id": new ObjectID(fWishlist._id),
                            "wishlist": fWishlist.wishlist,
                            "userId": fWishlist.userId,
                            "items": data,
                            "page": page,
                            "total_items": countWlistItem,
                            "total_pages": Math.ceil(countWlistItem / size),
                            "status": fWishlist.status
                        })
                    }
                    return data;
                })
                .then((data) => {

                    data.map((item) => { item.id = item.itemId })
                    data.forEach((item) => { delete item.itemId })
                    return data
                })
                const client = new Elasticsearch.Client({
                                host: request.elasticsearch.host,
                                keepAlive: false
                            })
                const esItemData = await request.helper.item.parse(popWlistItem, user, client)

                if (!esItemData) return reply(Boom.badRequest("Invalid item."))

                return reply({
                    "_id": new ObjectID(fWishlist._id),
                    "wishlist": fWishlist.wishlist,
                    "userId": fWishlist.userId,
                    "items": esItemData,
                    "page": page,
                    "total_items": countWlistItem,
                    "total_pages": Math.ceil(countWlistItem / size),
                    "status": fWishlist.status
                })

            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
