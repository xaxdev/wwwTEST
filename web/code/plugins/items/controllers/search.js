import Elasticsearch from 'elasticsearch'
const Boom = require('boom');
const Hoek = require('hoek');
const Joi = require('joi');
const Promise = require('bluebird');
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

    // elastic
    //   .search({
    //     index: 'mol',
    //     type: 'items',
    //     body: internals.query
    //   }).then(function (response) {
    //     const totalRecord = response.hits.total;
    //
    //     elastic.close();
    //     return reply(GetAllData(response, sortDirections, sortBy, size, page, userCurrency, keys, obj, request));
    //
    //   })
    //   .catch(function (error) {
    //     elastic.close();
    //     return reply(Boom.badImplementation(err));
    //   });

    const getAllItems =  elastic
            .search({
                index: 'mol',
                type: 'items',
                body: internals.query
            });

    const getSetReference = getAllItems.then((response) => {
        const setReferenceResult = response.hits.hits.map((element) => element._source);
        const setReferenceFilter = setReferenceResult.filter((item) => {
                return item.setReference != undefined && item.setReference != '';
        })
        const setReferenceArray = setReferenceFilter.map((item) => {
            return item.setReference;
        })
        const setReferenceUniq = setReferenceArray.sort().filter(function(item, pos, ary) {
            return !pos || item != ary[pos - 1];
        })
        console.log('setReferenceUniq-->', setReferenceUniq.length);
        // console.log('setReferenceResult-->',setReferenceResult);
      const query = JSON.parse(
        `{
          "query":{
               "constant_score": {
                 "filter": {
                   "bool": {
                     "must": [
                       {
                         "match": {
                           "reference": "${setReferenceUniq.join(' ')}"
                         }
                       }
                     ]
                   }
                 }
               }
            }
          }`);

          return elastic.search({
              index: 'mol',
              type: 'setitems',
              body: query
          })
    });

    try {
        Promise.all([getAllItems, getSetReference]).
            spread((allItems, setReferences) => {
            const allItemsResult = allItems.hits.hits.map((element) => element._source);
            const totalRecord = allItems.hits.total;

            const setReferenceData = setReferences.hits.hits.map((element) => element._source);

            console.log('setReferenceData-->', setReferenceData.length);
            console.log('totalRecord-->',totalRecord);
            let isViewAsSet = !!keys.find((key) => {return key == 'viewAsSet'});

            elastic.close();
            if (isViewAsSet) {
                return reply(GetAllData(setReferences, sortDirections, sortBy, size, page, userCurrency, keys, obj, request));
            }else {
                return reply(GetAllData(allItems, sortDirections, sortBy, size, page, userCurrency, keys, obj, request));
            }
        })
        .catch(function(err) {
            elastic.close();
            console.log(err);
            return reply(Boom.badImplementation(err));
        });
    } catch (err) {
        elastic.close();
        return reply(Boom.badImplementation(err));
    }
  }
};
