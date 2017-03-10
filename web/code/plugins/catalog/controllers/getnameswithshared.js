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
                const ownList = await db.collection('CatalogName').find({ 'userId': request.auth.credentials.id }).sort({ 'catalog': 1 }).toArray();
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
                    }, {
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
                // return reply({error:'',message:'Share catalog success.',statusCode:200});
            } catch (e) {

                return reply(Boom.badImplementation('', e))
            }
        })();
    }
}
