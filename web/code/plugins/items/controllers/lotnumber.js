const Boom = require('boom');
import Elasticsearch from 'elasticsearch'
const Promise = require('bluebird');

const internals = {
  filters: []
};

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {
        const elastic = new Elasticsearch.Client({
                        host: request.elasticsearch.host,
                        keepAlive: false
                    });

        const reference = request.payload.reference;

        internals.query = JSON.parse(
                            `{
                                  "size": 100000,
                                  "query":
                                    {
                                     "match": {"reference": "${reference}"}
                                    }
                            }`);

        console.log(JSON.stringify(internals.query, null, 2));
    }
};
