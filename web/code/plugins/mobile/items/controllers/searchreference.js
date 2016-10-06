import Boom from 'boom'
import Elasticsearch from 'elasticsearch'
import Joi from 'joi'

const internals = {
    filters: []
};

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    validate: {
        params: {
            reference: Joi.string().required()
        }
    },
    handler: async (request, reply) => {

        (async (request, reply) => {

            const client = new Elasticsearch.Client({
                            host: request.elasticsearch.host,
                            keepAlive: false
                        })
            try {
                const reference = request.params.reference
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
                                                "match": { "reference.raw": reference }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                })
                if (responseItem.hits && responseItem.hits.hits.length > 0) {
                    const item = responseItem.hits.hits[0]._source

                    // add certificate images to item gallery
                    if (!!item.gemstones) {
                        const certificateImages = item.gemstones.reduce((certificateImages, gemstone) => (gemstone.certificate && gemstone.certificate.images)? certificateImages.concat(gemstone.certificate.images) : certificateImages, [])
                        item.gallery.push(...certificateImages)
                    }

                    const user = await request.user.getUserById(request, request.auth.credentials.id)
                    const response = { ...request.helper.item.authorization(user, item) }
                    if (response.authorization) {
                        await request.history.save(request, reply, response)
                        return reply(response).type('application/json')
                    }
                    return reply.invalidItems([response])
                } else {
                    return reply(Boom.badRequest('Invalid item reference.'))
                }
            } catch (e) {
                return reply(Boom.badImplementation(e.message))
            } finally {
                client && client.close()
            }
            reply.success()
        })(request, reply)
    }
};
