import Elasticsearch from 'elasticsearch'
import GetHTMLViewASSetGridAll from '../utils/getHtmlViewAsSetGridAll';
import GetHtmlListAll from '../utils/getHtmlListAll';
import GetHtmlListViewAsSetAll from '../utils/getHtmlListViewAsSetAll';
import * as file from '../utils/file'
const Boom = require('boom');
const Hoek = require('hoek');
const Joi = require('joi');
const Promise = require('bluebird');
const GetSalesSearch = require('../utils/getSalesSearch');
const GetAllSalesData = require('../utils/getAllSalesDataPDF');
const fs = require('fs');
const Path = require('path');
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
        const obj = request.payload;
        const page = request.payload.page;
        let sortBy = request.payload.sortBy;
        const sortDirections = request.payload.sortDirections;
        const userCurrency = 'USD';
        const userPermissionPrice = request.payload.userPermissionPrice;
        const keys = Object.keys(obj);
        const size = request.payload.pageSize;
        const itemsOrder = request.payload.ItemsOrder;
        const setReferencdOrder = request.payload.SetReferencdOrder;
        const isSetReference = !!request.payload.setReference? true: false;
        const amqpHost = request.server.plugins.amqp.host;
        const amqpChannel = request.server.plugins.amqp.channelPdf;
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

        const getAllItems =  elastic.search({
            index: 'mol_solditems',
            type: 'solditems',
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

                let itemsNotMMECONSResult =[{}];
                let itemsMMECONSResult =[{}];

                let isViewAsSet = !!keys.find((key) => {return key == 'viewAsSet'});

                elastic.close();
                console.log('writing html...');
                let temp = '';
                const userName =  request.payload.userName;
                const env =  request.payload.env;
                const viewType =  request.payload.viewType;
                let datas = null;
                let curr = isViewAsSet ? 'USD' : userCurrency
                console.log('isViewAsSet-->',isViewAsSet);
                (async _ => {
                    if (isViewAsSet) {
                        datas = await GetAllSalesData(setReferences, sortDirections, sortBy, size, page, userCurrency, keys,
                            obj, request, itemsOrder, setReferencdOrder,itemsNotMMECONSResult,itemsMMECONSResult);

                        if (viewType == 'grid') {
                            temp = await GetHTMLViewASSetGridAll(datas,curr,isViewAsSet,env,userPermissionPrice);
                        } else {
                            temp = await GetHtmlListViewAsSetAll(datas,curr,isViewAsSet,env,userPermissionPrice);
                        }
                        const destination = Path.resolve(__dirname, '/home/mol/www/projects/production/pdf/import_html');

                        await file.write(`${destination}/${userName}.html`, temp);
                        console.log('writing done!');
                        amqp.connect(amqpHost, function(err, conn) {
                            conn.createChannel(function(err, ch) {
                                const q = amqpChannel;

                                ch.assertQueue(q);
                                // Note: on Node 6 Buffer.from(msg) should be used
                                let params = {
                                    'userName': userName,
                                    'userEmail': request.payload.userEmail,
                                    'ROOT_URL': request.payload.ROOT_URL
                                };
                                ch.sendToQueue(q, new Buffer(JSON.stringify(params, null, 2)), {persistent: true});
                              });
                        });
                        return reply({temp:'done!'});
                    }else {
                        datas = await GetAllSalesData(data, sortDirections, sortBy, size, page, userCurrency, keys,
                            obj, request, itemsOrder, setReferencdOrder,itemsNotMMECONSResult,itemsMMECONSResult);
                        if (viewType == 'grid') {
                            temp = await GetHTMLViewASSetGridAll(datas,curr,isViewAsSet,env,userPermissionPrice)
                        } else if (viewType == 'list') {
                            temp = await GetHtmlListAll(datas,curr,isViewAsSet,env,userPermissionPrice)
                        }
                        const destination = Path.resolve(__dirname, '/home/mol/www/projects/production/pdf/import_html');

                        await file.write(`${destination}/${userName}.html`, temp);
                        console.log('writing done!');
                        amqp.connect(amqpHost, function(err, conn) {
                            conn.createChannel(function(err, ch) {
                                const q = amqpChannel;

                                ch.assertQueue(q);
                                // Note: on Node 6 Buffer.from(msg) should be used
                                let params = {
                                    'userName': userName,
                                    'userEmail': request.payload.userEmail,
                                    'ROOT_URL': request.payload.ROOT_URL
                                };
                                ch.sendToQueue(q, new Buffer(JSON.stringify(params, null, 2)), {persistent: true});
                                // console.log(' [x] Sent "Parameter!"');
                              });
                        });
                        return reply({temp:'done!'});
                    }
                })()

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
