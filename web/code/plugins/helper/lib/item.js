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

    applyPermission: (items, user) => {

        try {
            const userLocation = user.permission.onhandLocation.places
            const userWarehouse = user.permission.onhandWarehouse.places

            items.forEach((item) => {

                const location = userLocation.length != 0 ? userLocation.find(place => place === item.site) : true
                const warehouse = userWarehouse.length != 0 ? userWarehouse.find(place => place === item.warehouse) : true

                item.authorization = !!location && !!warehouse
                item.actualCost = _.hasIn(item.actualCost, user.currency) ? _.result(item.actualCost, user.currency) : -1
                item.updatedCost = _.hasIn(item.updatedCost, user.currency) ? _.result(item.updatedCost, user.currency) : -1
                item.price = _.hasIn(item.price, user.currency) ? _.result(item.price, user.currency) : -1

                switch (user.permission.price.toUpperCase()) {
                    case "PUBLIC":
                        delete item.actualCost
                        delete item.updatedCost
                        break;
                    case "UPDATED":
                        delete item.actualCost
                        break;
                }
            })

            return items
        } catch (err) {

            throw err
        }
    }
}
