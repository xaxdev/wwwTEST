import Boom from 'boom'
import Joi from 'joi'
import _  from 'lodash'

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    validate: {
        params: {
            id: Joi.string().required()
        }
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID
                const searchId = request.params.id

                const findShared = await db.collection('SearchCriteria').findOne(
                    {
                        "_id": new ObjectID(searchId),
                        "owner": request.auth.credentials.id
                    })

                return reply(findShared !== null && findShared.criteria !== null ? findShared.criteria : {})
            } catch (e) {

                return reply(Boom.badImplementation('', e))
            }
        })();
    }
}
