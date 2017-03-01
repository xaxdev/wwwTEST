import Boom from 'boom'
import Joi from 'joi'
import _  from 'lodash'

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    validate: {
        payload: {
            id: Joi.string(),
            name: Joi.string().required(),
            criteria: Joi.object().required()
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

                const searchCollection = await db.collection('SearchCriteria').findOneAndUpdate(
                {
                    _id: new ObjectID(searchId)
                },
                {
                    $set: {
                        "name": request.payload.catalog,
                        "owner": request.auth.credentials.id
                    }
                },
                {
                    upsert: true,
                    returnOriginal: false
                })

                return reply.success()
            } catch (e) {

                return reply(Boom.badImplementation('', e))
            }
        })();
    }
}
