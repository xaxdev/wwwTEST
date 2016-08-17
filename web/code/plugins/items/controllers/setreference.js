const Boom = require('boom');

const internals = {
  filters: []
};

module.exports = {
  auth: false,
  handler: (request, reply) => {

    const elastic = request.server.plugins.elastic.client;
    console.log('request.payload-->',request.params.setReference);
    const setReference = request.params.setReference;
    const productId = request.params.productId;

    internals.query = JSON.parse(
      `{
        "sort" : [
             { "reference" : "desc" }
          ],
        "query":{
             "constant_score": {
               "filter": {
                 "bool": {
                   "must": [
                     {
                       "match": {
                         "setReference": "${setReference}"
                       }
                     }
                   ],
                   "must_not": [
                     {
                       "match": {
                         "id": "${productId}"
                       }
                     }
                   ]
                 }
               }
             }
          }
        }`);

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
        elastic.close();
        return reply(JSON.stringify(productdata, null, 4));
      })
      .catch(function (error) {
        elastic.close();
        return reply(Boom.badImplementation(err));
      });
  }
};
