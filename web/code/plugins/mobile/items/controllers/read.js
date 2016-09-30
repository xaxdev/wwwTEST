import Boom from 'boom'
import Elasticsearch from 'elasticsearch'
import Joi from 'joi'

export default {
    auth: {
        strategy: 'authentication'
    },
    validate: {
        params: {
            id: Joi.number()
        }
    },
    handler: (request, reply) => {

        (async (request, reply) => {

            let client = null
            try {
                client = new Elasticsearch.Client({
                                host: request.elasticsearch.host,
                                keepAlive: false
                            })
                const id = request.params.id
                const responseItem = await client.search({
                    "index": 'mol',
                    "type": 'items',
                    "filter_path": "**._source",
                    "body": {
                        "query": {
                            "constant_score": {
                                "filter": {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": { "id": id }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                })
                if (responseItem.hits.hits.length > 0) {
                    const item = responseItem.hits.hits[0]._source
                    const responseItemSet = await client.search({
                        "index": 'mol',
                        "type": 'setitems',
                        "filter_path": "**._source",
                        "body": {
                            "query": {
                                "constant_score": {
                                    "filter": {
                                        "bool": {
                                            "must": [
                                                {
                                                    "match": { "reference": item.setReference }
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    })

                    if (responseItemSet.hits.hits.length > 0) {
                        const itemSet = responseItemSet.hits.hits[0]._source
                        reply(item).type('application/json')
                    } else {
                        reply(item).type('application/json')
                    }
                } else {
                    reply(Boom.badRequest('Invalid item id'))
                }
            } catch (e) {
                reply(Boom.badImplementation(err.message))
            } finally {
                client && client.close()
            }
            reply.success()
        })(request, reply)
    }
}
