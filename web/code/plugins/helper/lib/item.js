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

const applyAuthorization = (user, item) => {
    const sites = user.permission.onhandLocation.places
    const warehouses = user.permission.onhandWarehouse.places
    const authorization = ((sites.length === 0 || (item.site && sites.indexOf(item.site) !== -1))
        && (warehouses.length === 0 || (item.warehouse && warehouses.indexOf(item.warehouse) !== -1))) || false
    return { ...item, authorization }
}

const authorize = user => {
    return x => x.map(item => { return applyAuthorization(user, item) })
}

const getPriceIn = currency => price => price[currency]

const applyPermission = (user, item) => {
    const currency = user.currency
    const actualCost = getPriceIn(currency)(item.actualCost) || -1
    const updatedCost = getPriceIn(currency)(item.updatedCost) || -1
    const price = getPriceIn(currency)(item.price) || -1
    const result = { ...item, actualCost, updatedCost, price }

    result.gemstones.forEach(gemstone => delete gemstone.cost)

    switch (user.permission.price.toUpperCase()) {
        case "PUBLIC":
            delete result.actualCost
            delete result.updatedCost
            delete result.markup
            break;
        case "UPDATED":
            delete result.actualCost
            break;
    }

    return result
}

const permission = user => x => x.map(item => {
    if (item.authorization) {
        return applyPermission(user, item)
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
    parse: async (items, user, es) => {
        try {
            const stock = await searchES(es, items)
            const inStock = x => x.map(get(stock.hits.hits))
            return compose(inStock, authorize(user), permission(user))(items)
        } catch (e) {
            throw e
        }
    },
    applyAuthorization,
    applyPermission
}
