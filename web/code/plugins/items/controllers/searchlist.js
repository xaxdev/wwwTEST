import Boom from 'boom'
import Joi from 'joi'
import _  from 'lodash'

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID

                const ownList = await db.collection('SearchCriteria').find(
                    {
                        "owner": request.auth.credentials.id
                    },
                    {
                        "name": 1
                    }
                ).sort({ "name": 1 }).toArray()
                const markOwnList = ownList.map((item) => { return { ...item, shared: false } })

                const sharedList = await db.collection('SearchCriteria').find(
                    {
                        "users.id": { $in: [request.auth.credentials.id] }
                    },
                    {
                        "name": 1
                    }
                ).sort({ "name": 1 }).toArray()
                const markSharedList = sharedList.map((item) => { return { ...item, shared: true } })

                return reply(_.union(markOwnList, markSharedList))
            } catch (e) {

                return reply(Boom.badImplementation('', e))
            }
        })();
    }
}
