import Boom from 'boom'
import Elasticsearch from 'elasticsearch'
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
        validate: {
            query: {
                page: Joi.number().integer(),
                size: Joi.number().integer(),
                q: Joi.string()
            }
        },
        handler: (request, reply) => {

            (async _ => {

                const client = new Elasticsearch.Client({
                                host: request.elasticsearch.host,
                                keepAlive: false
                            })
                const user = await request.user.getUserById(request, request.auth.credentials.id)
                const page = Number(request.query.page || request.pagination.page)
                const size = Number(request.query.size || request.pagination.size)

                try {
                    const db = request.mongo.db
                    const { _id: comparisonId } = await db.collection('Comparison').findOne({ 'user.id': request.auth.credentials.id })
                    const condition = (!!request.query.q)? { comparisonId, reference: { "$regex": request.query.q, "$options": "i"  } } : { comparisonId }
                    const count = await db.collection('ComparisonList').find(condition).count()
                    const items = await db.collection('ComparisonList').find(condition,
                                    {
                                        _id: 0,
                                        comparisonId: 0,
                                        lastModified: 0
                                    }).sort({ lastModified: -1 }).limit(size).skip((page - 1) * size).toArray()
                    let data = []
                    if (!!items.length) {
                        data = await request.helper.item.parse(items, user, client)
                    }
                    return reply({
                        items: data,
                        total_items: count,
                        total_pages: Math.ceil(count/size)

                    }).type('application/json')
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
                    const user = await request.user.getUserById(request, request.auth.credentials.id)
                    const client = new Elasticsearch.Client({
                                    host: request.elasticsearch.host,
                                    keepAlive: false
                                })
                    const data = await request.helper.item.parse(request.payload.items, user, client)
                    const failed = data.filter(item => !item.availability || !item.authorization)
                    if (failed.length > 0) {
                        return reply.invalidItems(failed)
                    } else {
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
                        const items = data.map(request.helper.mongo.operation.upsert({ comparisonId }))
                        await db.collection('ComparisonList').bulkWrite(items)
                        reply.success()
                    }
                } catch (err) {
                    return reply(Boom.badImplementation(err.message))
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
