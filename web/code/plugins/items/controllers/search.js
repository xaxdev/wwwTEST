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
    let itemsOrder = request.payload.ItemsOrder;
    let setReferencdOrder = request.payload.SetReferencdOrder;

    internals.query = GetSearch(request, 0, 100000);

    // console.log(JSON.stringify(internals.query, null, 2));

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
        let isViewAsSet = !!keys.find((key) => {return key == 'viewAsSet'});
        if (isViewAsSet) {
            if (sortBy.indexOf('price') != -1) {
                sortBy = 'totalPrice.USD';
            }else if (sortBy.indexOf('Date') != -1) {
                sortBy = 'createdDate';
            }else if (sortBy.indexOf('setReference') != -1) {
                sortBy = 'reference';
            }else{
                sortBy = sortBy;
            }
        }
        // if (sortBy.indexOf('price') != -1) {
        //     sortBy = 'totalPrice.USD';
        // }else if (sortBy.indexOf('Date') != -1) {
        //     sortBy = 'createdDate';
        // }else if (sortBy.indexOf('Date') != -1) {
        //     sortBy = 'createdDate';
        // }else if (sortBy.indexOf('setReference') != -1) {
        //     sortBy = 'reference';
        // }else{
        //     sortBy = sortBy;
        // }

        let missing = '';

        switch (sortDirections) {
          case 'asc':
            missing = '"missing" : "_first"';
            missing = `{"${sortBy}" : {${missing}}},`;
            break;
          default:
        }

      const query = JSON.parse(
        `{
            "timeout": "5s",
            "from": 0,
          "size": 10000,
          "sort" : [
              ${missing}
              {"${sortBy}" : "${sortDirections}"}
           ],
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

        //   console.log(JSON.stringify(query, null, 2));

          return elastic.search({
              index: 'mol',
              type: 'setitems',
              body: query
          })
    });

    const getItemsNotMMECONS = getAllItems.then((response) => {

        let missing = '';

        switch (sortDirections) {
            case 'asc':
                missing = '"missing" : "_first"';
                missing = `{"${sortBy}" : {${missing}}},`;
                break;
            default:
        }

        const query = JSON.parse(
          `{
              "timeout": "5s",
              "from": 0,
            "size": 100000,
            "sort" : [
                ${missing}
                {"${sortBy}" : "${sortDirections}"}
             ],
            "query":{
                 "constant_score": {
                   "filter": {
                     "bool": {
                       "must": [
                           {
                              "match": {
                                  "company": {
                                      "query": "DAT CSL DTD MBS MDT MGC MKU MDO MJW MME MMF MMU MAM STD STS STSA VC"
                                  }
                              }
                          }
                       ],
                        "must_not":[
                          {
                                "match": {
                                    "warehouse": {
                                        "query": "MME.CONS"
                                    }
                                }
                            }
                        ]
                     }
                   }
                 }
              }
            }`);

        if (!!keys.find((key) => {return key == 'warehouse'})) {
            if (obj['warehouse'].indexOf('MME.CONS') != -1) {
                  return elastic.search({
                      index: 'mol',
                      type: 'items',
                      body: query
                  })
            }
        } else {
            return [{}]
        }
    });

    try {
        Promise.all([getAllItems, getSetReference, getItemsNotMMECONS]).
            spread((allItems, setReferences, itemsNotMMECONS) => {
            const allItemsResult = allItems.hits.hits.map((element) => element._source);
            const totalRecord = allItems.hits.total;
            const setReferenceData = setReferences.hits.hits.map((element) => element._source);
            let itemsNotMMECONSResult =[{}];

            if (!!keys.find((key) => {return key == 'warehouse'})) {
                if (obj['warehouse'].indexOf('MME.CONS') != -1) {
                      itemsNotMMECONSResult = itemsNotMMECONS.hits.hits.map((element) => element._source);
                }
            }

            let isViewAsSet = !!keys.find((key) => {return key == 'viewAsSet'});

            elastic.close();
            if (isViewAsSet) {
                return reply(GetAllData(setReferences, sortDirections, sortBy, size, page, userCurrency, keys,
                            obj, request, itemsOrder, setReferencdOrder,itemsNotMMECONSResult));
            }else {
                return reply(GetAllData(allItems, sortDirections, sortBy, size, page, userCurrency, keys,
                            obj, request, itemsOrder, setReferencdOrder,itemsNotMMECONSResult));
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
