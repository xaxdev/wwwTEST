const Boom = require('boom');

const internals = {
  filters: []
};

module.exports = {
  auth: false,
  handler: (request, reply) => {

    const elastic = request.server.plugins.elastic.client;
    const setReference = request.params.setReference;
    const productId = request.params.productId;

    internals.query = JSON.parse(
      `{
        "query":{
             "constant_score": {
               "filter": {
                 "bool": {
                   "must": [
                     {
                       "match": {
                         "reference": "${setReference}"
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
        type: 'setitems',
        body: internals.query
      }).then(function (response) {


         let productdata = [];
        const productResult = response.hits.hits.map((element) => element._source);

        let len = productResult[0].items.length;

        for (let i = 0; i < len; i++) {
           if(productId !== productResult[0].items[i].id){
              productdata.push({
                  id: productResult[0].items[i].id,
                  image:productResult[0].items[i].image
              });
           }
        }



        const responseData = {
          totalprice:productResult[0].totalPrice,
          setimage:productResult[0].image.original,
          products:productdata

        }
        console.log(responseData);
        elastic.close();
        return reply(JSON.stringify(responseData, null, 4));
      })
      .catch(function (error) {
        elastic.close();
        return reply(Boom.badImplementation(err));
      });
  }
};
