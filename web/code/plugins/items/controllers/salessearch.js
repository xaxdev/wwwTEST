import Elasticsearch from 'elasticsearch'
const Boom = require('boom');
const Hoek = require('hoek');
const Joi = require('joi');
const Promise = require('bluebird');
const GetSalesSearch = require('../utils/getSalesSearch');
const getAllSalesData = require('../utils/getAllSalesData');

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
        let itemsOrder = request.payload.ItemsSalesOrder;
        let setReferencdOrder = request.payload.SetReferenceSalesOrder;
        let isSetReference = !!request.payload.setReference? true: false;
        let ps=[];

        const getClarityItems =  (query) => {
            // console.log(JSON.stringify(query, null, 2));
            return elastic.search({
                index: 'mol_solditems',
                type: 'solditems',
                body: query
            })
        };

        if (!!keys.find((key) => {return key == 'gemstones'})) {
            const valusObj = obj['gemstones'];
            const clarityFields = Object.keys(valusObj);
            if (!!clarityFields.find((key) => {return key == 'clarity'})) {
                const clarities = valusObj.clarity.split(',');
                clarities.map((clar) => {
                    internals.query = GetSalesSearch(request, 0, 100000,clar);
                    ps.push(getClarityItems(internals.query));
                })
            }else{
                internals.query = GetSalesSearch(request, 0, 100000,null);
                // console.log(JSON.stringify(internals.query, null, 2));
                ps.push(getClarityItems(internals.query));
            }
        }else{
            internals.query = GetSalesSearch(request, 0, 100000,null);
            // console.log(JSON.stringify(internals.query, null, 2));
            ps.push(getClarityItems(internals.query));
        }


        // console.log(JSON.stringify(internals.query, null, 2));

        const getAllSalesItems =  elastic.search({
            index: 'mol_solditems',
            type: 'solditems',
            body: internals.query
        });

        const getSetReference = getAllSalesItems.then((response) => {
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
            if (sortBy.indexOf('price') != -1) {
                sortBy = 'totalPrice.USD';
            }else if (sortBy.indexOf('Date') != -1) {
                sortBy = 'postedDate';
            }else if (sortBy.indexOf('setReference') != -1) {
                sortBy = 'reference';
            }else{
                sortBy = sortBy;
            }

            let missing = '';

            switch (sortDirections) {
                case 'asc':
                    missing = '"missing" : "_first"';
                    missing = `{"${sortBy}" : {${missing}}},`;
                    break;
                default:
                    break;
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
                }`
            );

            return elastic.search({
                index: 'mol_solditems',
                type: 'setitems',
                body: query
            })
        });

        const getSetReferenceData = (data) => {
            const setReferenceResult = data;
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
            if (sortBy.indexOf('price') != -1) {
                sortBy = 'totalPrice.USD';
            }else if (sortBy.indexOf('Date') != -1) {
                sortBy = 'postedDate';
            }else if (sortBy.indexOf('setReference') != -1) {
                sortBy = 'reference';
            }else{
                sortBy = sortBy;
            }

            let missing = '';

            switch (sortDirections) {
                case 'asc':
                    missing = '"missing" : "_first"';
                    missing = `{"${sortBy}" : {${missing}}},`;
                    break;
                default:
                    break;
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
                }`
            );

            return elastic.search({
                index: 'mol_solditems',
                type: 'setitems',
                body: query
            })
        };

        try {
            Promise.all(ps).then(async (allItems) => {
                let data = [];
                await allItems.map((all) => {
                    data.push(...all.hits.hits.map((element) => element._source))
                })
                const setReferences = await getSetReferenceData(data);
                const setReferenceData = setReferences.hits.hits.map((element) => element._source);

                let isViewAsSet = !!keys.find((key) => {return key == 'viewAsSet'});

                elastic.close();

                if (isViewAsSet) {
                    return reply(getAllSalesData(setReferenceData, sortDirections, sortBy, size, page, userCurrency, keys, obj, request, itemsOrder,
                        setReferencdOrder,isSetReference
                    ));
                }else {
                    return reply(getAllSalesData(data, sortDirections, sortBy, size, page, userCurrency, keys, obj, request, itemsOrder, setReferencdOrder,
                        isSetReference
                    ));
                }
                // console.log('allItems-->',getAllSalesData(data, sortDirections, sortBy, size, page, userCurrency, keys, obj, request));
                // return reply(getAllSalesData(data, sortDirections, sortBy, size, page, userCurrency, keys, obj, request));

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
