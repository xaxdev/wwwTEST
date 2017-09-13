import Boom from 'boom'
import Elasticsearch from 'elasticsearch'

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async _ => {

            const client = new Elasticsearch.Client({
                host: request.elasticsearch.host,
                keepAlive: false
            })

            try {
                // let responseItems = []
                // let responseSetItems = []
                // let responseNone = []
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID
                const user = await request.user.getUserById(request, request.auth.credentials.id)
                const data = await request.mongo.db.collection('CatalogItem').find().toArray()
                const dataWithItems = data.filter((item) => { return item.id !== null })
                const dataWithSetItems = data.filter((item) => { return item.id === null })

                if (!!dataWithItems.length && dataWithItems.length > 0) {
                    const es = await client.search(request.helper.item.parameters(dataWithItems))
                    const inventory = await request.helper.item.inventory(dataWithItems, es)
                    const all = await request.helper.item.authorization(user, inventory)
                    const hasPrice = all.filter((item) => {
                        return item.priceInUSD > -1
                    })

                    const noPrice = all.filter((item) => {
                        return !!!item.priceInUSD
                    })

                    hasPrice.forEach(async (item) => {

                        await db.collection('CatalogItem_test').findOneAndUpdate(
                            {
                                '_id': new ObjectID(item._id)
                            },
                            {
                                $set: {
                                    'priceInUSD': item.priceInUSD,
                                    'setReference': item.reference
                                }
                            },
                            {
                                upsert: false,
                                returnNewDocument: true
                            })
                    })

                    noPrice.forEach(async (item) => {

                        await db.collection('CatalogItem_test').update(
                            {
                                'id': item.id,
                                'reference': item.reference
                            },
                            {
                                $set: {
                                    'priceInUSD': 0,
                                    'setReference': ''
                                }
                            },
                            {
                                upsert: false,
                                multi: true,
                                returnNewDocument: true
                            })
                    })
                }

                if (!!dataWithSetItems.length && dataWithSetItems.length > 0) {
                    const esSetItems = await client.search(request.helper.setitem.parameters(dataWithSetItems))
                    const inventorySetItems = await request.helper.setitem.inventory(dataWithSetItems, esSetItems)
                    const allSetItem = await request.helper.setitem.authorization(user, inventorySetItems)
                    const hasSetPrice = allSetItem.filter((item) => {
                        return item.priceInUSD > -1
                    })

                    const noSetPrice = allSetItem.filter((item) => {
                        return !!!item.priceInUSD
                    })

                    hasSetPrice.forEach(async (setitem) => {

                        await db.collection('CatalogItem_test').findOneAndUpdate(
                            {
                                '_id': new ObjectID(setitem._id)
                            },
                            {
                                $set: {
                                    'priceInUSD': setitem.priceInUSD,
                                    'setReference': setitem.reference
                                }
                            },
                            {
                                upsert: false,
                                returnNewDocument: true
                            })
                    })

                    noSetPrice.forEach(async (setitem) => {

                        await db.collection('CatalogItem_test').update(
                            {
                                'id': setitem.id,
                                'reference': setitem.reference
                            },
                            {
                                $set: {
                                    'priceInUSD': 0,
                                    'setReference': ''
                                }
                            },
                            {
                                upsert: false,
                                multi: true,
                                returnNewDocument: true
                            })
                    })
                }

                return reply('OK')
            } catch (e) {
                return reply(Boom.badImplementation('', e))
            } finally {
                client && client.close()
            }
        })()
    }
}
