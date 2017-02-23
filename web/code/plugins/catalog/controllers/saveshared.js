import Boom from 'boom'
import Joi from 'joi'
import _  from 'lodash'

const shareduser = Joi.object().keys({
    id: Joi.number().min(0).required()
});

export default {
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
                const catalogId = request.payload.id
                const users = request.payload.users
                const owner = await request.user.getUserById(request, request.auth.credentials.id)

                const sharedMe = await users.find(user => { return user.id === owner.id })
                if (!!sharedMe) return reply(Boom.badRequest("Share yourself is denied."))

                const findShared = await db.collection('CatalogShared').findOne(
                    {
                        "catalogId": new ObjectID(catalogId),
                        "owner": owner.id
                    })

                if (findShared !== null) {
                    const sharedUser = typeof(findShared.users) !== "undefined" ? findShared.users : []
                    findShared.users = _.uniqBy(_.union(sharedUser, users), "id")
                }
                else {
                    findShared.users = users
                }

                const updatedShared = await db.collection('CatalogShared').updateOne(
                    {
                        "catalogId": new ObjectID(catalogId),
                        "owner": owner.id
                    },
                    {
                        "catalogId": new ObjectID(catalogId),
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
