import Boom from 'boom'
import Joi from 'joi'
import _  from 'lodash'

const shareduser = Joi.object().keys({
    id: Joi.number().min(0).required()
});

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    validate: {
        payload: {
            id: Joi.string().required(),
            users: Joi.array().items(shareduser)
        }
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID
                const searchId = request.payload.id
                const searchName = request.payload.name
                const users = request.payload.users
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
                        "_id": new ObjectID(searchId)
                    },
                    {
                        $set: {
                            "users": findShared.users                            
                        }
                    },
                    {
                        upsert: false
                    }
                )

                return reply.success()
            } catch (e) {

                return reply(Boom.badImplementation('', e))
            }
        })();
    }
}
