import Boom from 'boom'
import _ from 'lodash'

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const db = request.mongo.db;
                const ownCatalog = await db.collection('CatalogItem').aggregate([
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
                const ownCatalogHasItem = ownCatalog.filter((data) => {
                    return data.id !== null
                })
                const uniqOwnCatalogHasItem = _.uniqWith(ownCatalogHasItem.map((data) => { return data.catalogId }), _.isEqual)
                const ownList = await db.collection('CatalogName').find(
                    {
                        "_id": { $in: uniqOwnCatalogHasItem },
                        "userId": request.auth.credentials.id
                    })
                    .sort({
                        "catalog": 1
                    })
                    .toArray()
                const markOwnList = ownList.map((item) => { return { ...item, shared: false } });

                const sharedLists = await db.collection('CatalogName').aggregate([
                    {
                        $lookup: {
                            from: 'CatalogShared',
                            localField: '_id',
                            foreignField: 'catalogId',
                            as: 'CatalogShared'
                        }
                    },
                    {
                        $unwind: '$CatalogShared'
                    },
                    {
                        $match: {
                            'CatalogShared.users.id': request.auth.credentials.id
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            catalog: 1,
                            userId: 1,
                            updatedDate: 1
                        }
                    }])
                    .toArray();
                const markSharedList = sharedLists.map((sharedList) => {
                    return { ...sharedList, shared: true, catalog: 'Shared: ' + sharedList.catalog}
                });

                return reply(_.union(markOwnList, markSharedList));
            } catch (e) {

                return reply(Boom.badImplementation('', e))
            }
        })();
    }
}
