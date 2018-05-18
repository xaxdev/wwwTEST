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

                const findSearch = await db.collection('SalesSearchCriteria').findOne( { '_id': new ObjectID(searchId) })
                const isShared = findSearch !== null && findSearch.owner !== request.auth.credentials.id ? true : false
                return reply(
                    findSearch !== null && findSearch.criteria !== null ? {
                         'searchId': findSearch._id, 'shared': isShared, 'criteria':findSearch.criteria, 'name':findSearch.name
                    } : {}
                )
            } catch (e) {
                return reply(Boom.badImplementation('', e))
            }
        })();
    }
}
