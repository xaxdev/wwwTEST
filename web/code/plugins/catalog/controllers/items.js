import Joi from 'joi'
import Boom from 'boom'
import Elasticsearch from 'elasticsearch'
import constants from '../constants'

export default {
    auth: {
        strategy: 'authentication'
    },
    validate: {
        query: {
            page: Joi.number().integer().positive(),
            size: Joi.number().integer().positive(),
            sort: Joi.number().integer().positive(),
            order: Joi.number().valid(1, -1)
        }
    },
    handler: (request, reply) => {

        (async _ => {

            const client = new Elasticsearch.Client({
                                host: request.elasticsearch.host,
                                keepAlive: false
                            })

            try {
                const id = request.params.id || ''
                const catalogId = request.mongo.ObjectID(id)
                const page = Number(request.query.page || request.pagination.page)
                const size = Number(request.query.size || request.pagination.size)
                const sort = constants.sort[request.query.sort] || 'lastModified'
                const order = request.query.order || -1
                const sorting = { [sort]: order }
                const cursor = await request.mongo.db.collection('CatalogName').aggregate([
                            {
                                $match: { _id: catalogId }
                            },
                            {
                                $lookup: {
                                    from: 'CatalogItem',
                                    localField: '_id',
                                    foreignField: 'catalogId',
                                    as: 'items'
                                }
                            },
                            {
                                $project: {
                                    _id: 1,
                                    catalog: 1,
                                    items: 1
                                }
                            }
                        ])
                const [catalog] = await cursor.toArray()
                catalog.items = catalog.items !== undefined && catalog.items.length > 0 ? catalog.items.filter((item) => { return item.id !== null }) : []

                if (!!catalog) {
                    if (catalog.items.length === 0) {
                        return reply({ ...catalog, page: 1, total_items: 0, total_pages: 0, })
                    }

                    const es = await client.search(request.helper.item.parameters(catalog.items))
                    const user = await request.user.getUserById(request, request.auth.credentials.id)
                    let inventory = await request.helper.item.inventory(catalog.items, es)
                    const all = await request.helper.item.authorization(user, inventory)

                    const price = all.reduce((previous, current) => previous + current.price, 0)
                    const updatedCost = all.reduce((previous, current) => previous + current.updatedCost, 0)

                    const data = await request.mongo.db.collection('CatalogItem').find({ catalogId, 'id': { $ne: null } }, { '_id': 0, 'catalogId': 0, 'lastModified': 0 })
                                            .sort(sorting).limit(size).skip((page - 1) * size).toArray()
                    inventory = await request.helper.item.inventory(data, es)
                    const items = await request.helper.item.authorization(user, inventory)

                    const total_items = all.length
                    const total_pages = Math.ceil(total_items/size)

                    return reply({ ...catalog, price, updatedCost, page, total_items, total_pages, items })
                }

                return reply(Boom.badRequest('Invalid catalog id'))
            } catch (e) {
                return reply(Boom.badImplementation('', e))
            } finally {
                client && client.close()
            }
        })()
    }
}
