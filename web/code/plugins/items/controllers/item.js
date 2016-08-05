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

        const images = productResult.gemstones.reduce((accumulator, gemstone) => {
         let data = [];

         if (gemstone && gemstone.certificate && gemstone.certificate.images) {
           data = gemstone.certificate.images;
         }

         return accumulator.concat(data);
        }, []);


        productResult.gallery = productResult.gallery.concat(images);


        elastic.close();
        return reply(JSON.stringify(productResult, null, 4));
    })
    .catch(function(error) {
        elastic.close();
        return reply(Boom.badImplementation(err));
    });
  }
};
