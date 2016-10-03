import Boom from 'boom'

export default {
    count: {
        auth: {
            strategy: 'authentication'
        },
        handler: (request, reply) => {

            (async _ => {

                try {
                    const db = request.mongo.db
                    const wishlistData = await db.collection('WishlistName').aggregate([{
                        $match: {
                            userId: request.auth.credentials.id
                        }
                    },
                    {
                    	$lookup: {
                    		from: 'WishlistItem',
                    		localField: '_id',
                    		foreignField: 'wishlistId',
                    		as: 'items'
                    	}
                    },
                    {
                        $project: {
                            _id: 0,
                            userId: 1,
                            count: { $size: "$items" }
                        }
                    },
                    {
                        $group: {
                            _id: "$userId",
                            total: { $sum: "$count" }
                        }
                    }])
                    .toArray()

                    const catalogData = await db.collection('CatalogName').aggregate([{
                        $match: {
                            userId: request.auth.credentials.id
                        }
                    },
                    {
                        $lookup: {
                            from: 'CatalogItem',
                            localField: '_id',
                            foreignField: 'catalogId',
                            as: 'items'
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            userId: 1,
                            count: { $size: "$items" }
                        }
                    },
                    {
                        $group: {
                            _id: "$userId",
                            total: { $sum: "$count" }
                        }
                    }])
                    .toArray()

                    reply({
                        wishlist: wishlistData.length > 0 ? wishlistData[0].total : 0,
                        catalog: catalogData.length > 0 ? catalogData[0].total : 0
                    })
                } catch (err) {

                    reply(Boom.badImplementation(err.message))
                }
            })(request, reply);
        }
    }
}
