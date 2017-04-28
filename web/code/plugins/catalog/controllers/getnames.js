import Boom from 'boom'
import _ from 'lodash'

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const db = request.mongo.db
                const userCatalog = await db.collection('CatalogItem').aggregate([
                    {
                        $lookup: {
                            from: 'CatalogName',
                            localField: 'catalogId',
                            foreignField: '_id',
                            as: 'CatalogName'
                        }
                    },
                    {
                        $unwind: '$CatalogName'
                    },
                    {
                        $match: {
                            'CatalogName.userId': request.auth.credentials.id
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            catalogId: 1,
                            id : 1,
                            reference : 1,
                            description: 1,
                            lastModified: 1
                        }
                    }])
                    .toArray()

                const catalogHasItem = userCatalog.filter((data) => {
                    return data.id !== null
                })

                const uniqCatalogHasItem = _.uniqWith(catalogHasItem.map((data) => { return data.catalogId }), _.isEqual)

                reply(
                    await db.collection('CatalogName').find(
                        {
                            "_id": { $in: uniqCatalogHasItem },
                            "userId": request.auth.credentials.id
                        }
                    )
                    .sort(
                        {
                            "catalog": 1
                        }
                    )
                    .toArray()
                )
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
