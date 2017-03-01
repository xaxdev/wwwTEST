import Boom from 'boom'
import Joi from 'joi'
import _  from 'lodash'

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    validate: {
        payload: {
            id: Joi.string()
        }
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID
                const owner = await request.user.getUserById(request, request.auth.credentials.id)

                return reply.success()
            } catch (e) {

                return reply(Boom.badImplementation('', e))
            }
        })();
    }
}
