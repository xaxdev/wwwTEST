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
                const responseItems = []
                const responseSetItems = []
                const responseMissItems = []
                const responseMissSetItems = []
                const maxRecord = 1000
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID
                const user = await request.user.getUserById(request, request.auth.credentials.id)
                const dataCount = await request.mongo.db.collection('CatalogItem').count();
                const rounds = Math.ceil(dataCount/maxRecord)

                for (let i = 0; i < rounds; i++) {

                    const data = await request.mongo.db.collection('CatalogItem').find().limit(maxRecord).skip(maxRecord * i).toArray()
                    const dataWithItems = data.filter((item) => { return item.id !== null })
                    const dataWithSetItems = data.filter((item) => { return item.id === null })

                    if (!!dataWithItems.length && dataWithItems.length > 0) {
                        const es = await client.search(request.helper.item.parameters(dataWithItems))
                        const inventory = await request.helper.item.inventory(dataWithItems, es)
                        const all = await request.helper.item.authorization(user, inventory)
                        const hasPrice = all.filter((item) => {
                            return item.priceInUSD
                        })

                        const noPrice = all.filter((item) => {
                            return !!!item.priceInUSD
                        })

                        hasPrice.map(async (item) => {

                            return await db.collection('CatalogItem').updateOne(
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
                                    upsert: false
                                })
                                .then((value) => {
                                    responseItems.push(value.result)
                                })
                            })

                        noPrice.map(async (item) => {

                            return await db.collection('CatalogItem').updateMany(
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
                                    upsert: false
                                })
                                .then((value) => {
                                    responseMissItems.push(value.result)
                                })
                            })
                    }

                    if (!!dataWithSetItems.length && dataWithSetItems.length > 0) {
                        const esSetItems = await client.search(request.helper.setitem.parameters(dataWithSetItems))
                        const inventorySetItems = await request.helper.setitem.inventory(dataWithSetItems, esSetItems)
                        const allSetItem = await request.helper.setitem.authorization(user, inventorySetItems)
                        const hasSetPrice = allSetItem.filter((item) => {
                            return item.priceInUSD
                        })

                        const noSetPrice = allSetItem.filter((item) => {
                            return !!!item.priceInUSD
                        })

                        hasSetPrice.map(async (setitem) => {

                            return await db.collection('CatalogItem').updateOne(
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
                                    upsert: false
                                })
                                .then((value) => {
                                    responseSetItems.push(value.result)
                                })
                            })

                        noSetPrice.map(async (setitem) => {

                            return await db.collection('CatalogItem').updateMany(
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
                                    upsert: false
                                })
                                .then((value) => {
                                    responseMissSetItems.push(value.result)
                                })
                            })
                    }
                }

                return reply({
                    total: dataCount,
                    items: {
                        updated: responseItems.filter((item) => { return item.nModified === 1 }),
                        notUpdated: responseItems.filter((item) => { return item.nModified === 0 })
                    },
                    missItems: {
                        updated: responseMissItems.filter((item) => { return item.nModified === 1 }),
                        notUpdated: responseMissItems.filter((item) => { return item.nModified === 0 })
                    },
                    setItems: {
                        updated: responseSetItems.filter((item) => { return item.nModified === 1 }),
                        notUpdated: responseSetItems.filter((item) => { return item.nModified === 0 })
                    },
                    missSetItems: {
                        updated: responseMissSetItems.filter((item) => { return item.nModified === 1 }),
                        notUpdated: responseMissSetItems.filter((item) => { return item.nModified === 0 })
                    }
                })
                // return reply('ok');
            } catch (e) {
                return reply(Boom.badImplementation('', e))
            } finally {
                client && client.close()
            }
        })()
    }
}
