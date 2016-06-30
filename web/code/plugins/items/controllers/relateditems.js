const Boom = require('boom');
const Hoek = require('hoek');
const Joi = require('joi');
const _ = require('lodash');

const internals = {
  filters: []
};

module.exports = {
  auth: false,
  handler: (request, reply) => {

    const elastic = request.server.plugins.elastic.client;
    console.log('request.payload-->',request.params.collection);
    // const keys = Object.keys(request.payload);
    const collection = request.params.collection;
    const page = request.params.page;
    const itemperpage = 3;
    const offset = (page-1) * itemperpage;

    internals.query = JSON.parse(
    `{
      "size": ${itemperpage},
      "from": ${offset},
      "sort" : [
           { "reference" : "desc" }
        ],
      "query":
        {
         "match": {"collection": "${collection}"}
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
              image:'http://www.bq-magazine.com/wp-content/uploads/2013/09/Mouawad-Grand-Ellipse-Accessories-2-signet-1024x1024.jpg'
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
