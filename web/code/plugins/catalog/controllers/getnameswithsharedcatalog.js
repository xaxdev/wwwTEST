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
                const ownList = await db.collection('SetCatalogName').find({ 'userId': request.auth.credentials.id }).sort({ 'setCatalog': 1 }).toArray();
                const markOwnList = ownList.map((item) => { return { ...item, shared: false } });

                const sharedLists = await db.collection('SetCatalogName').aggregate([
                    {
                        $lookup: {
                            from: 'SetCatalogShared',
                            localField: '_id',
                            foreignField: 'setCatalogId',
                            as: 'SetCatalogShared'
                        }
                    },
                    {
                        $unwind: '$SetCatalogShared'
                    },
                    {
                        $match: {
                            'SetCatalogShared.users.id': request.auth.credentials.id
                        }
                    }, {
                        $project: {
                            _id: 1,
                            setCatalog: 1,
                            userId: 1,
                            updatedDate: 1
                        }
                    }])
                    .toArray();
                const markSharedList = sharedLists.map((sharedList) => {
                    return { ...sharedList, shared: true, setCatalog: 'Shared: ' + sharedList.setCatalog}
                });

                return reply(_.union(markOwnList, markSharedList));
                // return reply({error:'',message:'Share catalog success.',statusCode:200});
            } catch (e) {

                return reply(Boom.badImplementation('', e))
            }
        })();
    }
}
