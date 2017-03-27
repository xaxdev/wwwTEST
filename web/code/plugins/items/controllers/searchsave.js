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
                    const existingSearch = await db.collection('SearchCriteria').find({ "name": searchName, "owner": request.auth.credentials.id }).toArray()

                    if(existingSearch.length > 0) return reply(Boom.badRequest("Your required name is existing."))
                }

                const searchCollection = await db.collection('SearchCriteria').findOneAndUpdate(
                    {
                        _id: new ObjectID(searchId)
                    },
                    {
                        $set: {
                            'name': searchName,
                            'criteria': criteria,
                            'owner': request.auth.credentials.id
                        }
                    },
                    {
                        upsert: true,
                        returnOriginal: false
                    }
                )

                if (!searchId) {
                    return reply({
                        error: '',
                        message: 'Save success.',
                        statusCode: 200
                    });
                }else{
                    return reply({
                        error: '',
                        message: 'Update search success.',
                        statusCode: 200
                    });
                }
            } catch (e) {

                return reply(Boom.badImplementation('', e))
            }
        })();
    }
}
