import Joi from 'joi'
import Boom from 'boom'
import Elasticsearch from 'elasticsearch'
import constants from '../constants'
// const _ = require('lodash');
import lodash from 'lodash';

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
                    const user = await request.user.getUserById(request, request.auth.credentials.id)

                    total_pages = Math.ceil(data.length/size)
                    total_items = dataWithItems.length;
                    total_setitems = dataWithSetItems.length;

                    if (!!dataWithItems.length && dataWithItems.length > 0) {
                        const es = await client.search(request.helper.item.parameters(dataWithItems))
                        let inventory = await request.helper.item.inventory(dataWithItems, es)
                        let all = await request.helper.item.authorization(user, inventory)
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
                        const esSetItems = await client.search(request.helper.setitem.parameters(dataWithSetItems))
                        let inventorySetItems = await request.helper.setitem.inventory(dataWithSetItems, esSetItems)
                        const allSetItem = await request.helper.setitem.authorization(user, inventorySetItems)
                        setItemPrice = allSetItem.reduce((previous, current) => previous + (!!current.totalPrice ? current.totalPrice.USD : 0), 0)
                        setItemUpdatedCost = allSetItem.reduce((previous, current) => previous + (!!current.totalUpdatedCost ? current.totalUpdatedCost.USD : 0), 0)
                        responseAllItems.push(...allSetItem);
                    }

                    if (!!dispItems.length && dispItems.length > 0) {
                        const es = await client.search(request.helper.item.parameters(dispItems))
                        let inventory = await request.helper.item.inventory(dispItems, es)
                        const items = await request.helper.item.authorization(user, inventory)

                        response.push(...items)
                    }

                    if (!!dispSetItems.length && dispSetItems.length > 0) {
                        const esSetItems = await client.search(request.helper.setitem.parameters(dispSetItems))
                        let inventorySetItems = await request.helper.setitem.inventory(dispSetItems, esSetItems)
                        const itemsSetitem = await request.helper.setitem.authorization(user, inventorySetItems)

                        response.push(...itemsSetitem)
                    }
                    response.sort(sortBy(sort,order != 1));

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

/**
     * @description
     * Returns a function which will sort an
     * array of objects by the given key.
     *
     * @param  {String}  key
     * @param  {Boolean} reverse
     * @return {Function}
 */
function sortBy(key, reverse) {
    // Move smaller items towards the front
    // or back of the array depending on if
    // we want to sort the array in reverse
    // order or not.
    const moveSmaller = reverse ? 1 : -1;

    // Move larger items towards the front
    // or back of the array depending on if
    // we want to sort the array in reverse
    // order or not.
    const moveLarger = reverse ? -1 : 1;

    /**
     * @param  {*} a
     * @param  {*} b
     * @return {Number}
     */

     return function(a, b) {
         if (a[key] < b[key]) {
             return moveSmaller;
         }
         if (a[key] > b[key]) {
             return moveLarger;
         }
         return 0;
     };
}
