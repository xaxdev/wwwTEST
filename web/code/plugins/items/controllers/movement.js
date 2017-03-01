import Elasticsearch from 'elasticsearch'
const Boom = require('boom');
const Promise = require('bluebird');
const GetMovement = require('../utils/getMovement');
const GetGOC = require('../utils/getGOC');

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
        const type = request.payload.type;
        const sku = request.payload.sku;

        internals.queryMovement = GetMovement(reference,sku);
        internals.queryGOC = GetGOC(reference,sku);
        // console.log(JSON.stringify(internals.queryMovement, null, 2));
        // console.log(JSON.stringify(internals.queryGOC, null, 2));
        const getMovements =  elastic
                .search({
                    index: 'mol',
                    type: 'activities',
                    body: internals.queryMovement
                });
        const getGOCs =  elastic
                .search({
                    index: 'mol',
                    type: 'activities',
                    body: internals.queryGOC
                });
        Promise.all([getMovements, getGOCs]).spread((movements, gocs) => {
            try {
                const movement = movements.hits.hits.map((element) => element._source);
                const goc = gocs.hits.hits.map((element) => element._source);
                const datas = {
                    movement: movement,
                    goc: goc
                };
                elastic.close();
                return reply(datas);
            } catch (error) {
                console.log('error-->',error);
                return reply(Boom.badImplementation(error));
            }
        })
        .catch(function(err) {
            elastic.close();
            return reply(Boom.badImplementation(err));
        });
    }
};
