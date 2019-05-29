const Boom = require('boom');
const transform = require('../utils/transform')

const reduce = (items, current) =>{
    items.push(current.reference)
    return items
}

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {
        try {
            const elastic = request.server.plugins.elastic.client
            const db = request.mongo.db
            const { reference, page } = request.params
            const itemPerPage = 8;
            const offset = (page-1) * itemPerPage;
    
            let data = await db.collection('RelatedItem').find({
                'items': {'$elemMatch': {'reference': {'$regex' : `.*${reference.replace('|','/')}.*`}}}
            }).toArray()
    
            const { relatedItem } = await transform(data, 1, itemPerPage)
            let query = ''
            let relatedItems = []

            if (relatedItem.length > 0) {
                const { items } = relatedItem[0]
                relatedItems = items
                const references = items.reduce(reduce, [])
        
                query = JSON.parse(
                    `{
                        "size": 1000,
                        "query": {
                            "constant_score": {
                                "filter": {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {
                                                    "reference": "${references.join(' ')}"
                                                }
                                            }
                                        ],
                                        "must_not": [
                                            {
                                                "match": {
                                                    "reference": "${reference.replace('|','/')}"
                                                }
                                            },
                                            {
                                                "match": {
                                                    "warehouse": {
                                                        "query": "MME.CONS"
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }`
                );
            } 
            
            // console.log(JSON.stringify(query, null, 2));
            const getDataEs = (query) =>{
                return elastic.search({
                    index: 'mol',
                    type: 'items',
                    body: query
                })
            }
            const mapOrderBy = items => item =>{
                items.map((once)=>{
                    if (once.reference == item.reference) {
                        item.order = once.order
                    }
                })
                return item
            }
            let products = []
            let totalpage = 0
            if (relatedItem.length > 0) {
                const response = await getDataEs(query)
                const result = await Promise.all(response.hits.hits.map((element) => element._source).map(mapOrderBy(relatedItems)))
    
                let len = result.length;
                
                for (let i = 0; i < len; i++) {
                    products.push({
                        id: result[i].id,
                        reference: result[i].reference,
                        image: result[i].gallery,
                        order: result[i].order,
                    });
                }
                products = products.sort(compareBy('order','asc'))
                products = products.slice( (page - 1) * itemPerPage, page * itemPerPage );    
            } else {
                products = []
            }
            
            const responeData = { totalpage, products };
            elastic.close();
            return reply(JSON.stringify(responeData, null, 4));
            // return reply({})
        } catch (err) {
            console.log(err);
            return reply(Boom.badImplementation('', err));
        }
    }
};

const compareBy = (property, order = 'asc') => (a, b) => {
    if(!a.hasOwnProperty(property) || !b.hasOwnProperty(property)) {
        return 0;
    }
    let priceA = 0;
    let priceB = 0;
    const first = (property.toLowerCase().indexOf('price') != -1)
                  ? a[property] != undefined
                      ? a[property] != undefined ? a[property] : 0
                      : 0
                  : a[property]
    const second = (property.toLowerCase().indexOf('price') != -1)
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
