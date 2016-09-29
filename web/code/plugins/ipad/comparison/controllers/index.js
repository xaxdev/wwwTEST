import Boom from 'boom'
import Hoek from 'hoek'
import Joi from 'joi'
import Moment from 'moment'

const schema = Joi.object({
    id: Joi.string().required(),
    reference: Joi.string().required(),
    description: Joi.string().required()
})

export default {
    retrieve: {
        auth: {
            strategy: 'authentication'
        },
        handler: (request, reply) => {

            (async _ => {

                const user = await request.user.getUserById(request, reply, request.auth.credentials.id)
                const page = Number(request.query.page || request.pagination.page)
                const size = Number(request.query.size || request.pagination.size)

                try {
                    const db = request.mongo.db
                    const { _id: comparisonId } = await db.collection('Comparison').findOne({ 'user.id': request.auth.credentials.id })
                    const items = await db.collection('ComparisonList').find({ comparisonId },
                                    {
                                        _id: 0,
                                        comparisonId: 0,
                                        lastModified: 0
                                    }).sort({ lastModified: -1 }).limit(size).skip((page - 1) * size).toArray()
                    let data = []
                    if (!!items.length) {
                        data = await request.helper.item.synchronize(request.server.plugins.elastic.client, items)
                    }
                    return reply(data).type('application/json')
                } catch (err) {
                    reply(Boom.badImplementation(err.message))
                }
            })(request, reply);
        }
    },
    insert: {
        auth: {
            strategy: 'authentication'
        },
        validate: {
            payload: {
                items: Joi.array().items(schema).min(1)
            }
        },
        handler: (request, reply) => {

            (async _ => {

                try {

                    const db = request.mongo.db
                    const result = await db.collection('Comparison').findOneAndUpdate(
                        {
                            'user.id': request.auth.credentials.id
                        },
                        {
                            $setOnInsert: {
                                user: {
                                    id: request.auth.credentials.id,
                                    email: request.auth.credentials.email
                                },
                                lastModified: new Date()
                            }
                        },
                        {
                            upsert: true
                        }
                    )
                    const comparisonId = (result.lastErrorObject.updatedExisting) ? result.value._id : result.lastErrorObject.upserted
                    const items = request.payload.items.map(request.helper.mongo.operation.upsert({ comparisonId }))
                    await db.collection('ComparisonList').bulkWrite(items)
                    reply.success()
                } catch (err) {
                    reply(Boom.badImplementation(err.message))
                }
            })(request, reply);
        }
    },
    remove: {
        auth: {
            strategy: 'authentication'
        },
        validate: {
            payload: {
                items: Joi.array().items({ id: Joi.string().required() }).min(1)
            }
        },
        handler: (request, reply) => {

            (async _ => {

                try {

                    const db = request.mongo.db
                    const { _id } = await db.collection('Comparison').findOne({ 'user.id': request.auth.credentials.id })
                    const items = request.payload.items.map(request.helper.mongo.operation.delete({ comparisonId: _id }))
                    await db.collection('ComparisonList').bulkWrite(items)
                    reply.success()
                } catch (err) {
                    reply(Boom.badImplementation(err.message))
                }
            })(request, reply);
        }
    }
}
