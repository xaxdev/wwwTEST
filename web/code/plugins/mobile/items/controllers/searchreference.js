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

            let client = null
            try {
                client = new Elasticsearch.Client({
                                host: request.elasticsearch.host,
                                keepAlive: false
                            })
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
                                                "match": { "reference": reference }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                })
                if (responseItem.hits && responseItem.hits.hits.length > 0) {
                    let item = responseItem.hits.hits[0]._source

                    // add certificate images to item gallery
                    if (!!item.gemstones) {
                        const certificateImages = item.gemstones.reduce((certificateImages, gemstone) => (gemstone.certificate && gemstone.certificate.images)? certificateImages.concat(gemstone.certificate.images) : certificateImages, [])
                        item.gallery.push(...certificateImages)
                    }

                    const user = await request.user.getUserById(request, request.auth.credentials.id)
                    item = { ...request.helper.item.applyPermission(user, item), availability: true, authorization: true }
                    await request.history.save(request, reply, item)
                    reply(item).type('application/json')
                } else {
                    reply(Boom.badRequest('Invalid item id'))
                }
            } catch (e) {
                reply(Boom.badImplementation(e.message))
            } finally {
                client && client.close()
            }
            reply.success()
        })(request, reply)
    }
};
