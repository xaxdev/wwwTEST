import { Client as elasticsearch } from 'elasticsearch'
import hoek from 'hoek'

const compare = onHand => {

    return item => {

        const onHandItem = onHand.find(element => element.id === item.id)

        return { ...item, ...onHandItem, status: !!onHandItem }
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
    }
}
