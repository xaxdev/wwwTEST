import Elasticsearch from 'elasticsearch'
const Boom = require('boom');
const Hoek = require('hoek');
const Joi = require('joi');
const Promise = require('bluebird');
const GetSearch = require('../utils/getSearch');
const GetAllData = require('../utils/getAllData');
const GetSetReference = require('../utils/getSetReference');

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
        let isSetReference = !!request.payload.setReference? true: false;
        let ps=[];

        const getClarityItems =  (query) => {
            // console.log(JSON.stringify(query, null, 2));
            return elastic.search({
                index: 'mol',
                type: 'items',
                body: query
            })
        };

        if (!!keys.find((key) => {return key == 'gemstones'})) {
            const valusObj = obj['gemstones'];
            const clarityFields = Object.keys(valusObj);
            if (!!clarityFields.find((key) => {return key == 'clarity'})) {
                const clarities = valusObj.clarity.split(',');
                clarities.map((clar) => {
                    internals.query = GetSearch(request, 0, 100000, clar);
                    ps.push(getClarityItems(internals.query));
                })
            }else{
                internals.query = GetSearch(request, 0, 100000, null);
                ps.push(getClarityItems(internals.query));
            }
        }else{
            internals.query = GetSearch(request, 0, 100000, null);
            ps.push(getClarityItems(internals.query));
        }

        // console.log(JSON.stringify(internals.query, null, 2));

        try {
            Promise.all(ps).then(async (allItems) => {
                let data = [];
                await allItems.map((all) => {
                    data.push(...all.hits.hits.map((element) => element._source))
                })

                let itemsNotMMECONSResult =[{}];
                let itemsMMECONSResult =[{}];

                let isViewAsSet = !!keys.find((key) => {return key == 'viewAsSet'});

                if (isViewAsSet) {
                    const params = {
                        sortBy, sortDirections, keys, obj
                    }
                    const setReferences = await GetSetReference(data, params, elastic);
                    
                    const setReferenceData = setReferences.hits.hits.map((element) => element._source);

                    elastic.close();
                    return reply(GetAllData(setReferenceData, sortDirections, sortBy, size, page, userCurrency, keys,
                        obj, request, itemsOrder, setReferencdOrder, itemsNotMMECONSResult, itemsMMECONSResult,
                        isSetReference
                    ));
                }else {
                    elastic.close();
                    return reply(GetAllData(data, sortDirections, sortBy, size, page, userCurrency, keys, obj,
                        request, itemsOrder, setReferencdOrder, itemsNotMMECONSResult, itemsMMECONSResult, isSetReference
                    ));
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
