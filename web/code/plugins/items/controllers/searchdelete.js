import Boom from 'boom'
import Joi from 'joi'
import _  from 'lodash'

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    validate: {
        payload: {
            id: Joi.string().required()
        }
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID
                const searchId = request.payload.id

                const searchCollection = await db.collection('SearchCriteria').deleteOne({ _id: new ObjectID(searchId) })

                return reply({
                    error: '',
                    message: 'Deleted search criteria success.',
                    statusCode: 200
                });
            } catch (e) {

                return reply(Boom.badImplementation('', e))
            }
        })();
    }
}
