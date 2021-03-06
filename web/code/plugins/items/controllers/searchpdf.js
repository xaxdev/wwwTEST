import Elasticsearch from 'elasticsearch'
import GetHTMLViewASSetGridAll from '../utils/getHtmlViewAsSetGridAll';
import GetHtmlListAll from '../utils/getHtmlListAll';
import GetHtmlListViewAsSetAll from '../utils/getHtmlListViewAsSetAll';
import * as file from '../utils/file'
const Boom = require('boom');
const Hoek = require('hoek');
const Joi = require('joi');
const Promise = require('bluebird');
const GetSearch = require('../utils/getSearch');
const GetAllData = require('../utils/getAllDataPDF');
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
        const userCurrency = request.payload.userCurrency;
        const userPermissionPrice = request.payload.userPermissionPrice;
        const keys = Object.keys(obj);
        const size = request.payload.pageSize;
        const itemsOrder = request.payload.ItemsOrder;
        const setReferencdOrder = request.payload.SetReferencdOrder;
        const itemsList = request.payload.itemsList;
        const amqpHost = request.server.plugins.amqp.host;
        const amqpChannel = request.server.plugins.amqp.channelPdf;

        internals.query = GetSearch(request, 0, 100000);

        // console.log(JSON.stringify(internals.query, null, 2));

        const getAllItems =  elastic.search({
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
            if (sortBy.indexOf('price') != -1) {
                sortBy = 'totalPrice.USD';
            }else if (sortBy.indexOf('Date') != -1) {
                sortBy = 'createdDate';
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
                index: 'mol',
                type: 'setitems',
                body: query
            })
        });

        try {
            Promise.all([getAllItems, getSetReference]).spread((allItems, setReferences) => {
                const allItemsResult = allItems.hits.hits.map((element) => element._source);
                const totalRecord = allItems.hits.total;
                const setReferenceData = setReferences.hits.hits.map((element) => element._source);
                let itemsNotMMECONSResult =[{}];
                let itemsMMECONSResult =[{}];

                let isViewAsSet = !!keys.find((key) => {return key == 'viewAsSet'});

                elastic.close();
                console.log('writing html...');
                let temp = '';
                const { userName, env, viewType, titleColumn } =  request.payload
                let datas = null;
                let curr = isViewAsSet ? 'USD' : userCurrency;
                (async _ => {
                    if (isViewAsSet) {
                        datas = await GetAllData(setReferences, sortDirections, sortBy, size, page, userCurrency, keys,
                            obj, request, itemsOrder, setReferencdOrder,itemsNotMMECONSResult,itemsMMECONSResult);

                        if (viewType == 'grid') {
                            temp = await GetHTMLViewASSetGridAll(datas,curr,isViewAsSet,env,userPermissionPrice);
                        } else {
                            temp = await GetHtmlListViewAsSetAll(datas,curr,isViewAsSet,env,userPermissionPrice,titleColumn);
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
                        datas = await GetAllData(allItems, sortDirections, sortBy, size, page, userCurrency, keys,
                            obj, request, itemsOrder, setReferencdOrder,itemsNotMMECONSResult,itemsMMECONSResult);
                        // if (itemsList.length != 0) {
                        //     let params = {}
                        //     let dataItemsList = []
                        //     params = {...params, 'itemsList': itemsList, dataItemsList}
                        //     datas = datas.reduce(reducer, params).dataItemsList   
                        // }
                        // console.log({datas});
                        if (viewType == 'grid') {
                            temp = await GetHTMLViewASSetGridAll(datas,curr,isViewAsSet,env,userPermissionPrice)
                        } else if (viewType == 'list') {
                            temp = await GetHtmlListAll(datas,curr,isViewAsSet,env,userPermissionPrice,titleColumn)
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

const reducer = (params, current) =>{
    console.log({current});
    let {dataItemsList, itemsList} = params
    
    const result = itemsList.find( ({ reference }) => reference === current[0] );
    if (!!result) {
        dataItemsList.push(current)
    }

    params = {...params, dataItemsList}

    return params
}