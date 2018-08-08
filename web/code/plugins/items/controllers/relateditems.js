const Boom = require('boom');

const internals = {
    filters: []
};

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {
        const elastic = request.server.plugins.elastic.client;
        const collection = request.params.collection;
        const currency = request.params.currency;
        const currentprice = request.params.price;
        const dominant = request.params.dominant;
        const page = request.params.page;
        const productId = request.params.productId;
        const itemperpage = 8;
        const offset = (page-1) * itemperpage;
        const price = `price.${currency}`;

        const pricegte = parseInt(currentprice) - (parseInt(currentprice) * 10) / 100 ;
        const pricelt = parseInt(currentprice) + (parseInt(currentprice) * 10) / 100 ;

        internals.query = JSON.parse(
            `{
              "size": ${itemperpage},
              "from": ${offset},
              "sort" : [
                   { "reference" : "desc" }
                ],
                "query": {
                    "constant_score": {
                      "filter": {
                        "bool": {
                          "must": [
                            {
                              "match": {
                                "dominant": "${dominant}"
                              }
                            },
                            {
                              "match": {
                                "subType": "${collection}"
                              }
                            },
                            {
                              "range" : {
                                   "${price}" : {
                                      "gte" : "${pricegte}",
                                      "lt"  : "${pricelt}"
                                  }
                                }
                            }
                          ],
                          "must_not": [
                            {
                              "match": {
                                  "id": "${productId}"
                              },
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
        elastic
        .search({
            index: 'mol',
            type: 'items',
            body: internals.query
        }).then(function (response) {
            let productdata = [];
            const productResult = response.hits.hits.map((element) => element._source);
            let len = productResult.length;

            for (let i = 0; i < len; i++) {
                productdata.push({
                    id: productResult[i].id,
                    image:productResult[i].gallery
                });
            }
            const responeData = {
                totalpage:Math.ceil(response.hits.total / itemperpage),
                products:productdata
            };
            elastic.close();
            return reply(JSON.stringify(responeData, null, 4));
        })
        .catch(function (error) {
            elastic.close();
            return reply(Boom.badImplementation(err));
        });
    }
};
