import Boom from 'boom'
import Joi from 'joi'
import _  from 'lodash'

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    validate: {
        payload: {
            data: Joi.object().required()    
        }
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID
                const searchId = request.payload.id
                const searchName = request.payload.name
                const owner = await request.user.getUserById(request, request.auth.credentials.id)

                const sharedMe = await users.find(user => { return user.id === owner.id })
                if (!!sharedMe) return reply(Boom.badRequest("Share yourself is denied."))

                const findShared = await db.collection('SearchCriteria').findOne(
                    {
                        "_id": new ObjectID(searchId),
                        "owner": owner.id
                    })

                if (findShared !== null) {
                    const sharedUser = typeof(findShared.users) !== "undefined" ? findShared.users : []
                    findShared.users = _.uniqBy(_.union(sharedUser, users), "id")
                }
                else {
                    findShared.users = users
                }

                const updatedShared = await db.collection('SearchCriteria').updateOne(
                    {
                        "_id": new ObjectID(searchId),
                        "owner": owner.id
                    },
                    {
                        "_id": new ObjectID(searchId),
                        "owner": owner.id,
                        "users": findShared.users
                    },
                    {
                        upsert: true
                    }
                )

                return reply.success()
            } catch (e) {

                return reply(Boom.badImplementation('', e))
            }
        })();
    }
}
