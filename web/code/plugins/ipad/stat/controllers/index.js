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
                    const cursor = db.collection('WishlistName').aggregate([
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
                                items: {
                                    $slice: ['$items', 10, 100]
                                }
                            }
                        }
                    ])
                    const result = await cursor.next()
                    return reply({}).type('application/json')
                } catch (err) {
                    reply(Boom.badImplementation(err.message))
                }
            })(request, reply);
        }
    }
}
