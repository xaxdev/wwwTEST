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
    const id = request.params.id;

    internals.query = JSON.parse(
    `{
      "query":
        {
         "match": {"id": "${id}"}
        }
    }`);

    elastic
      .search({
        index: 'mol',
        type: 'items',
        body: internals.query
      }).then(function (response) {

        const productResult = response.hits.hits.map((element) => element._source);
        elastic.close();
        return reply(JSON.stringify(productResult[0], null, 4));
      })
      .catch(function (error) {
        elastic.close();
        return reply(Boom.badImplementation(err));
      });
  }
};
