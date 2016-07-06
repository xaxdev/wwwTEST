const Boom = require('boom');

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
    })
    .then(function(response) {

        const [productResult] = response.hits.hits.map((element) => element._source);

        productResult.certificates.forEach((certificate) => {
            productResult.gallery = [...productResult.gallery, certificate.image]
        });

        elastic.close();
        return reply(JSON.stringify(productResult, null, 4));
    })
    .catch(function(error) {
        elastic.close();
        return reply(Boom.badImplementation(err));
    });
  }
};
