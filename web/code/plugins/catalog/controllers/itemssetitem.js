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
                const sort = constants.sort[request.query.sort] || 'lastModified';
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

                    let response = [];
                    let responseAllItems = [];
                    let price = 0;
                    let updatedCost = 0;
                    let setItemPrice = 0;
                    let setItemUpdatedCost = 0;
                    let total_items = 0;
                    let total_pages = 0;
                    let total_setitems = 0;
                    const data = await request.mongo.db.collection('CatalogItem').find(
                        {
                            catalogId
                        })
                        .sort(sorting)
                        .toArray()
                    const dataSorted = await request.mongo.db.collection('CatalogItem').find(
                        {
                            catalogId
                        })
                        .sort(sorting)
                        .limit(size)
                        .skip((page - 1) * size)
                        .toArray()
                    const dataWithItems = data.filter((item) => { return item.id !== null })
                    const dataWithSetItems = data.filter((item) => { return item.id === null })
                    const dispItems = dataSorted.filter((item) => { return item.id !== null })
                    const dispSetItems = dataSorted.filter((item) => { return item.id === null })

                    total_pages = Math.ceil(data.length/size)
                    total_items = dataWithItems.length;
                    total_setitems = dataWithSetItems.length;

                    if (!!dataWithItems.length && dataWithItems.length > 0) {
                        let all = await parallelize(request, dataWithItems)
                        
                        responseAllItems.push(...all);
                        all = all.filter((item) => {
                            return item.price > -1
                        })
                        price = all.reduce((previous, current) => {
                            return previous + (!!current.price ? current.price: 0)
                        }, 0)
                        updatedCost = all.reduce((previous, current) => previous + (!!current.updatedCost ? current.updatedCost: 0), 0)
                    }

                    if (!!dataWithSetItems.length && dataWithSetItems.length > 0) {
                        let allSetItem = await parallelize(request, dataWithSetItems)

                        setItemPrice = allSetItem.reduce((previous, current) => previous + (!!current.totalPrice ? current.totalPrice.USD : 0), 0)
                        setItemUpdatedCost = allSetItem.reduce((previous, current) => previous + (!!current.totalUpdatedCost ? current.totalUpdatedCost.USD : 0), 0)
                        responseAllItems.push(...allSetItem);
                    }

                    if (!!dispItems.length && dispItems.length > 0) {
                        const items = await parallelize(request, dispItems)

                        response.push(...items)
                    }
                    
                    if (!!dispSetItems.length && dispSetItems.length > 0) {
                        const itemsSetitem = await parallelize(request, dispSetItems)

                        response.push(...itemsSetitem)
                    }
                    
                    response = response.sort(compareBy(sort,order == -1?'desc':'asc'));
                    
                    return reply({ ...catalog, price, updatedCost, setItemPrice, setItemUpdatedCost, page,
                        total_items, total_pages, total_setitems, 'items': response, 'allItems': responseAllItems })
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

const compareBy = (property, order = 'asc') => (a, b) => {
    if(!a.hasOwnProperty(property) || !b.hasOwnProperty(property)) {
        return 0;
    }
    const first = (property.toLowerCase().indexOf('priceInUSD') != -1 || property.toLowerCase().indexOf('netamount') != -1)
                    ? a[property] != undefined
                        ? a[property] != undefined ? a[property] : 0
                        : 0
                    : a[property]
    const second = (property.toLowerCase().indexOf('priceInUSD') != -1 || property.toLowerCase().indexOf('netamount') != -1)
                    ? b[property] != undefined
                        ? b[property] != undefined ? b[property] : 0
                        : 0
                    : b[property]
    if (typeof first !== typeof second) {
        return 0
    }

    let comparison = 0
    if (first > second) {
        comparison = 1
    }

    if (first < second) {
        comparison = -1
    }

    return (order === 'desc')? (comparison * -1) : comparison
}

const parallelize = async (request, items) => {
    try {
        const client = new Elasticsearch.Client({
            host: request.elasticsearch.host,
            keepAlive: false
        })

        const size = 900;
        const range = items.length;
        const rounds = Math.ceil((range - 0 + 1) / size);
        const inventories = [];

        for (let i = 0; i < rounds; i++) {
            const from =  (i * size);
            const to = (i * size) + size - 1;
            const itemsSlice = items.slice(from,to+1)
            const es = await client.search(request.helper.item.parameters(itemsSlice))
            const inventory = await request.helper.item.inventory(itemsSlice, es)
            inventories.push(...inventory)
        }
        const user = await request.user.getUserById(request, request.auth.credentials.id)
        const response = await request.helper.item.authorization(user, inventories)
        
        return response;
    } catch (error) {
        throw error;
    }
}