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

                if (!!catalog) {
                    if (catalog.items.length === 0) {
                        return reply({ ...catalog, page: 1, total_items: 0, total_pages: 0, })
                    }

                    let response = []
                    let price = 0
                    let updatedCost = 0
                    let setItemPrice = 0
                    let setItemUpdatedCost = 0
                    let total_items = 0;
                    let total_pages = 0;
                    let total_setitems = 0;
                    let total_setitems_pages = 0;
                    const useItems = catalog.items.filter((item) => { return item.id !== null })
                    const useSetItems = catalog.items.filter((item) => { return item.id === null })
                    total_items = useItems.length;
                    total_setitems = useSetItems.length;
                    const user = await request.user.getUserById(request, request.auth.credentials.id)

                    if (!!useItems.length && useItems.length > 0) {
                        const es = await client.search(request.helper.item.parameters(useItems))
                        let inventory = await request.helper.item.inventory(useItems, es)
                        const all = await request.helper.item.authorization(user, inventory)

                        price = all.reduce((previous, current) => previous + current.price, 0)
                        updatedCost = all.reduce((previous, current) => previous + current.updatedCost, 0)

                        const data = await request.mongo.db.collection('CatalogItem').find({ catalogId, "id": { $ne: null } }, { "_id": 0, "catalogId": 0, "lastModified": 0 })
                                                .sort(sorting).limit(size).skip((page - 1) * size).toArray()
                        inventory = await request.helper.item.inventory(data, es)
                        const items = await request.helper.item.authorization(user, inventory)
                        // total_items = items.length
                        total_pages = Math.ceil(catalog.items.length/size)

                        response.push(...items)
                    }

                    if (!!useSetItems.length && useSetItems.length > 0) {
                        const esSetItems = await client.search(request.helper.setitem.parameters(useSetItems))
                        let inventorySetItems = await request.helper.setitem.inventory(useSetItems, esSetItems)
                        const allSetItem = await request.helper.setitem.authorization(user, inventorySetItems)
                        setItemPrice = allSetItem.reduce((previous, current) => previous + current.totalPrice.USD, 0)
                        setItemUpdatedCost = allSetItem.reduce((previous, current) => previous + current.totalUpdatedCost.USD, 0)

                        const dataSetItem = await request.mongo.db.collection('CatalogItem').find({ catalogId, "id": null }, { "_id": 0, "catalogId": 0, "lastModified": 0 })
                                                .sort(sorting).limit(size).skip((page - 1) * size).toArray()
                        inventorySetItems = await request.helper.setitem.inventory(dataSetItem, esSetItems)
                        const itemsSetitem = await request.helper.setitem.authorization(user, inventorySetItems)
                        // total_setitems = itemsSetitem.length
                        total_setitems_pages = Math.ceil(catalog.items.length/size)

                        response.push(...itemsSetitem)
                    }

                    return reply({ ...catalog, price, updatedCost, setItemPrice, setItemUpdatedCost, page, total_items, total_pages, total_setitems, total_setitems_pages, "items": response })
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
