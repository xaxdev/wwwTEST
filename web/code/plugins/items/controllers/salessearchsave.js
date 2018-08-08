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
            name: Joi.string().required().trim(),
            criteria: Joi.string().required()
        }
    },
    handler: (request, reply) => {
        (async () => {
            try {
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID
                const searchId = request.payload.id
                const searchName = request.payload.name
                const criteria = request.payload.criteria

                if (!!!searchId) {
                    const existingSearch = await db.collection('SalesSearchCriteria').find({ "name": searchName, "owner": request.auth.credentials.id }).toArray()

                    if(existingSearch.length > 0) return reply(Boom.badRequest("Your required name is existing."))
                }

                const searchCollection = await db.collection('SalesSearchCriteria').findOneAndUpdate(
                    { _id: new ObjectID(searchId) },
                    { $set: {
                            'name': searchName,
                            'criteria': criteria,
                            'owner': request.auth.credentials.id
                        } },
                    {
                        upsert: true,
                        returnOriginal: false
                    }
                )

                const findId = (!searchId)? searchCollection.value._id : searchId;

                const findSearch = await db.collection('SalesSearchCriteria').findOne( { '_id': new ObjectID(findId) })
                const isShared = findSearch !== null && findSearch.owner !== request.auth.credentials.id ? true : false

                if (!searchId) {
                    return reply({
                        error: '',
                        message: 'Save success.',
                        statusCode: 200,
                        id: searchCollection.value._id,
                        criteria: findSearch !== null && findSearch.criteria !== null ? {
                             'searchId': findSearch._id, 'shared': isShared, 'criteria':findSearch.criteria, 'name':findSearch.name
                        } : {}
                    });
                }else{
                    return reply({
                        error: '',
                        message: 'Update search success.',
                        statusCode: 200,
                        id: searchId,
                        criteria: findSearch !== null && findSearch.criteria !== null ? {
                             'searchId': findSearch._id, 'shared': isShared, 'criteria':findSearch.criteria, 'name':findSearch.name
                        } : {}
                    });
                }
            } catch (e) {

                return reply(Boom.badImplementation('', e))
            }
        })();
    }
}
