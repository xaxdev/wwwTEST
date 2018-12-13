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

            const client = new Elasticsearch.Client({
                host: request.elasticsearch.host,
                keepAlive: false
            })
            try {
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
                                        ],
                                        "must_not": [
                                            {
                                                "match": {
                                                    "warehouse": {
                                                        "query": "MME.CONS"
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                })
                const changePathImages = company => record => {
                    const { original, thumbnail } = record
                    let data = {
                        original: original.replace('/images/products/original','/original/' + company.toLowerCase()),
                        thumbnail
                    }
                    return data
                }

                if (responseItem.hits && responseItem.hits.hits.length > 0) {
                    const item = responseItem.hits.hits[0]._source
                    const mapImagesCompany = (images, company) => {
                        return images.map(changePathImages(company))
                    }
                    // add certificate images to item gallery
                    if (!!item.gemstones) {
                        let certificateImages = item.gemstones.reduce((certificateImages, gemstone) => (gemstone.certificate && gemstone.certificate.images)
                            ? certificateImages.concat(gemstone.certificate.images)
                            : certificateImages, []
                        )

                        //change path original image of certificate by korakod
                        certificateImages = certificateImages.map((images) => {
                            let { original, thumbnail } = images;
                            original = original.replace('/images/products/original','/original/' + item.company.toLowerCase());
                            thumbnail = thumbnail.replace('/images/products/thumbnail','/original/' + item.company.toLowerCase());
                            return {...images, original, thumbnail};
                        });
                        item.gallery.push(...certificateImages)
                    }
                    if (item.imagesCOA.length > 0) {
                        item.imagesCOA = await Promise.all(mapImagesCompany(item.imagesCOA, item.company.toLowerCase()))
                    }
                    if (item.imagesDBC.length > 0) {
                        item.imagesDBC = await Promise.all(mapImagesCompany(item.imagesDBC, item.company.toLowerCase()))
                    }
                    if (item.filesMonograph.length > 0) {
                        item.filesMonograph = await Promise.all(mapImagesCompany(item.filesMonograph, item.company.toLowerCase()))
                    }
                    const user = await request.user.getUserById(request, request.auth.credentials.id)
                    const response = { ...request.helper.item.authorization(user, item) }
                    if (response.authorization) {
                        return reply(response).type('application/json')
                    }
                    return reply.invalidItems([response])
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
}
