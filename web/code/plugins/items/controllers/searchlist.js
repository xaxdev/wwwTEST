import Boom from 'boom'
import Joi from 'joi'
import _  from 'lodash'

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    validate: {
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID
                const owner = await request.user.getUserById(request, request.auth.credentials.id)

                // const ownList = await db.collection('CatalogName').find({ "userId": request.auth.credentials.id }).sort({ "catalog": 1 }).toArray()
                // const markOwnList = ownList.map((item) => { return { ...item, shared: false } })
                //
                // const sharedList = await db.collection('CatalogName').aggregate([
                //     {
                //         $lookup: {
                //             from: 'CatalogShared',
                //             localField: '_id',
                //             foreignField: 'catalogId',
                //             as: 'CatalogShared'
                //         }
                //     },
                //     {
                //         $unwind: "$CatalogShared"
                //     },
                //     {
                //         $match: {
                //             "CatalogShared.users.id": request.auth.credentials.id
                //         }
                //     }, {
                //         $project: {
                //             _id: 1,
                //             catalog: 1,
                //             userId: 1,
                //             updatedDate: 1
                //         }
                //     }])
                //     .toArray()
                // const markSharedList = sharedList.map((item) => { return { ...item, shared: true } })
                //
                // return reply(_.union(markOwnList, markSharedList))

                return reply.success()
            } catch (e) {

                return reply(Boom.badImplementation('', e))
            }
        })();
    }
}
