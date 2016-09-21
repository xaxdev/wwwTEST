import { Client as elasticsearch } from 'elasticsearch'
import hoek from 'hoek'

const synchronize = async (es, items) => {

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

        items.forEach(item => {

            const onHandItem = onHand.find(element => element.id === item.id)

            if (!!onHandItem) {
                hoek.merge(item, onHandItem)
                item.status = true
            } else {
                hoek.merge(item, { status: false })
            }
        })
    } catch (err) {
        throw err
    } finally  {
        es && es.close()
    }
}

export { synchronize }
