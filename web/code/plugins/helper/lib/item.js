import { Client as elasticsearch } from 'elasticsearch'
import hoek from 'hoek'
const _ = require('lodash')

const compare = onHand => {

    return item => {

        const onHandItem = onHand.find(element => element.id === item.id)

        return { ...item, ...onHandItem, availability: !!onHandItem }
    }
}

const searchES = async (es, items) => {

    try {
        const ids = items.map(item => item.id)
        const parameters = {
            "index": "mol",
            "type": "items",
            "filter_path": "**._source",
            "body": {
                "query": {
                    "constant_score": {
                        "query": {
                            "bool": {
                                "should": []
                            }
                        }
                    }
                }
            }
        }

        parameters.body.query.constant_score.query.bool.should.push(ids.map(id => {
            return {
                "match": {
                    "id": String(id)
                }
            }
        }))

        return await es.search(parameters)
    } catch (e) {
        throw e
    } finally {
        es && es.close()
    }
}

const source = x => x._source

const get = es => item => {
    const oh = es.map(source).find(d => Number(d.id) === Number(item.id))
    return { ...item, ...oh, availability: !!oh }
}

const authorize = user => {
    const sites = user.permission.onhandLocation.places
    const warehouses = user.permission.onhandWarehouse.places

    return x => x.map(item => {
        const authorization = ((sites.length === 0 || (item.site && sites.indexOf(item.site) !== -1))
            && (warehouses.length === 0 || (item.warehouse && warehouses.indexOf(item.warehouse) !== -1))) || false
        return { ...item, authorization }
    })
}

const getPriceIn = currency => price => price[currency]

const permission = user => x => x.map(item => {
    if (item.authorization) {
        const actualCost = getPriceIn(user.currency)(item.actualCost) || -1
        const updatedCost = getPriceIn(user.currency)(item.updatedCost) || -1
        const price = getPriceIn(user.currency)(item.price) || -1
        const result = { ...item, actualCost, updatedCost, price }

        result.gemstones.forEach(gemstone => delete gemstone.cost)

        switch (user.permission.price.toUpperCase()) {
            case "PUBLIC":
                delete result.actualCost
                delete result.updatedCost
                break;
            case "UPDATED":
                delete result.actualCost
                break;
        }

        return result
    } else {
        return {
            id: item.id,
            reference: item.reference,
            description: item.description,
            availability: item.availability,
            authorization: item.authorization
        }
    }
})

const compose = (...fs) => x => fs.reduce((p, f) => f(p), x)

export default {
    synchronize: async (es, items) => {

        try {
            const ids = items.map(item => item.id)

            const parameters = {
                "index": "mol",
                "type": "items",
                "body": {
                    "query": {
                        "constant_score": {
                            "query": {
                                "bool": {
                                    "should": []
                                }
                            }
                        }
                    }
                }
            }

            parameters.body.query.constant_score.query.bool.should.push(ids.map(id => {
                return {
                    "match": {
                        "id": String(id)
                    }
                }
            }))

            const result = await es.search(parameters)
            const onHand = result.hits.hits.map(record => record._source)
            return items.map(compare(onHand))
        } catch (err) {
            throw err
        } finally  {
            // es && es.close()
        }
    },
    authorize: user => record => {

        if (!record.availability) {
            return record
        }

        try {
            // authorization flag
            const sites = user.permission.onhandLocation.places
            const warehouses = user.permission.onhandWarehouse.places
            const isSiteOK = sites.length === 0 || sites.indexOf(record.site) !== -1
            const isWarehouseOK = warehouses.length === 0 || warehouses.indexOf(record.warehouse) !== -1
            const authorization = isSiteOK && isWarehouseOK

            if (authorization) {
                const item = { ...record, authorization }

                // costs & price
                const getPriceIn = currency => price => price[currency]
                item.actualCost = getPriceIn(user.currency)(item.actualCost) || -1
                item.updatedCost = getPriceIn(user.currency)(item.updatedCost) || -1
                item.price = getPriceIn(user.currency)(item.price) || -1

                // show or hide costs
                switch (user.permission.price.toUpperCase()) {
                    case "PUBLIC":
                    delete item.actualCost
                    delete item.updatedCost
                    break;
                    case "UPDATED":
                    delete item.actualCost
                    break;
                }

                return item
            } else {
                return {
                    id: record.id,
                    reference: record.reference,
                    description: record.description,
                    availability: record.availability,
                    authorization
                }
            }
        } catch (e) {
            throw e
        }
    },
    parse: async (items, user, es) => {
        try {
            const stock = await searchES(es, items)
            const inStock = x => x.map(get(stock.hits.hits))
            return compose(inStock, authorize(user), permission(user))(items)
        } catch (e) {
            throw e
        }
    }
}
