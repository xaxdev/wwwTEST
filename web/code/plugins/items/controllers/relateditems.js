const Boom = require('boom');

const internals = {
  filters: []
};

module.exports = {
  auth: false,
  handler: (request, reply) => {

    const elastic = request.server.plugins.elastic.client;
    // const keys = Object.keys(request.payload);
    const collection = request.params.collection;
    const page = request.params.page;
    const productId = request.params.productId;
    const itemperpage = 8;
    const offset = (page-1) * itemperpage;

    internals.query = JSON.parse(
    `{
      "size": ${itemperpage},
      "from": ${offset},
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
                       "subType": "${collection}"
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
