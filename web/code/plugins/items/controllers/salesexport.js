const Boom = require('boom');
const Hoek = require('hoek');
const Joi = require('joi');
const Promise = require('bluebird');
const GetSalesSearch = require('../utils/getSalesSearch');
const getAllSalesData = require('../utils/getAllSalesData');
// Require library export excel
const xl = require('excel4node');
const _ = require('lodash');
const fs = require('fs');
const Path = require('path');

import numberFormat from '../../http/src/utils/convertNumberformat';
import convertDate from '../../http/src/utils/convertDate';
import moment from 'moment';

const amqp = require('amqplib/callback_api');

const internals = {
    filters: []
};

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {
        const elastic = request.server.plugins.elastic.client;
        const amqpHost = request.server.plugins.amqp.host;
        const amqpChannel = request.server.plugins.amqp.channelExcel;
        let obj = request.payload;
        let page = request.payload.page;
        let sortBy = request.payload.sortBy;
        let sortDirections = request.payload.sortDirections;
        let userCurrency = 'USD';
        let keys = Object.keys(obj);
        let fields = request.payload.fields;
        let price = request.payload.price;
        let ROOT_URL = request.payload.ROOT_URL;
        let listFileName = [];
        let userName = request.payload.userName;
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

        const getAllSalesItems =  elastic.search({
            index: 'mol_solditems',
            type: 'solditems',
            body: internals.query
        });

        const getSetReference = getAllSalesItems.then((response) => {
            const setReferenceResult = response.hits.hits.map((element) => element._source);
            const setReferenceFilter = setReferenceResult.filter((item) => {
                return item.setReference != undefined && item.setReference != '';
            });
            const setReferenceArray = setReferenceFilter.map((item) => {
                return item.setReference;
            });
            const setReferenceUniq = setReferenceArray.sort().filter(function(item, pos, ary) {
                return !pos || item != ary[pos - 1];
            });
            let isViewAsSet = !!keys.find((key) => {return key == 'viewAsSet'});
            if (sortBy.indexOf('price') != -1) {
                sortBy = 'totalPrice.USD';
            }else if (sortBy.indexOf('Date') != -1) {
                sortBy = 'postedDate';
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
                amqp.connect(amqpHost, function(err, conn) {
                    conn.createChannel(function(err, ch) {
                        var q = amqpChannel;

                        ch.assertQueue(q);
                        // Note: on Node 6 Buffer.from(msg) should be used
                        ch.sendToQueue(q, new Buffer(JSON.stringify(request.payload, null, 2)), {persistent: true});
                        // console.log(' [x] Sent "Parameter!"');
                    });
                });
                if (isViewAsSet) {
                    return reply(getAllSalesData(setReferenceData, sortDirections, sortBy, size, page, userCurrency, keys, obj, request, itemsOrder,
                        setReferencdOrder, isSetReference
                    ));
                }else {
                    return reply(getAllSalesData(data, sortDirections, sortBy, size, page, userCurrency, keys, obj, request, itemsOrder, setReferencdOrder,
                        isSetReference
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
