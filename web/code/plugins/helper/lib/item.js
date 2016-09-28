import { Client as elasticsearch } from 'elasticsearch'
import hoek from 'hoek'
const _ = require('lodash')

const compare = onHand => {

    return item => {

        const onHandItem = onHand.find(element => element.id === item.id)

        return { ...item, ...onHandItem, availability: !!onHandItem }
    }
}

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
            es && es.close()
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
    }
}
