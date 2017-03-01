const Boom = require('boom');
const Hoek = require('hoek');
const Joi = require('joi');
const GetSearch = require('../utils/getSearch');
const GetAllData = require('../utils/getAllData');

const internals = {
  filters: []
};

module.exports = {
    auth: {
        strategy: 'authentication'
    },
  handler: (request, reply) => {

    const elastic = request.server.plugins.elastic.client;

    let obj = request.payload;
    let page = request.payload.page;
    let sortBy = request.payload.sortBy;
    let sortDirections = request.payload.sortDirections;
    let userCurrency = request.payload.userCurrency;
    let keys = Object.keys(obj);

    let size = request.payload.pageSize;

    internals.query = GetSearch(request, 0, 100000);

    // console.log(JSON.stringify(internals.query, null, 2));

    elastic
      .search({
        index: 'mol',
        type: 'items',
        body: internals.query
      }).then(function (response) {
        const totalRecord = response.hits.total;

        elastic.close();
        return reply(GetAllData(response, sortDirections, sortBy, size, page, userCurrency, keys, obj));

      })
      .catch(function (error) {
        elastic.close();
        return reply(Boom.badImplementation(err));
      });
  }
};
