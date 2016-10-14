const Boom = require('boom');
const Hoek = require('hoek');
const Joi = require('joi');
const GetSearch = require('../utils/getSearch');
const GetAllData = require('../utils/getAllData');
// Require library export excel
const xl = require('excel4node');
const _ = require('lodash');
const fs = require('fs');
const Path = require('path');

import numberFormat from '../../http/src/utils/convertNumberformat';
import convertDate from '../../http/src/utils/convertDate';
import moment from 'moment';

var amqp = require('amqplib/callback_api');

const internals = {
  filters: []
};

module.exports = {
  auth: false,
  handler: (request, reply) => {

    const elastic = request.server.plugins.elastic.client;
    const amqpHost = request.server.plugins.amqp.host;
    const amqpChannel = request.server.plugins.amqp.channel;
    // console.log(amqpHost);
    // console.log(amqpChannel);

    let obj = request.payload;
    let page = request.payload.page;
    let sortBy = request.payload.sortBy;
    let sortDirections = request.payload.sortDirections;
    let userCurrency = request.payload.userCurrency;
    let keys = Object.keys(obj);
    let fields = request.payload.fields;
    let price = request.payload.price;
    let ROOT_URL = request.payload.ROOT_URL;
    let listFileName = [];
    let userName = request.payload.userName;

    let pageSize = request.payload.pageSize;

    internals.query = GetSearch(request, 0, 100000);
    // console.log('searching...');

    elastic
      .search({
        index: 'mol',
        type: 'items',
        body: internals.query
      })
      .then(function (response) {
        let allData = [];
        let exportData = null;
        // console.log('Response Data');

        let data = response.hits.hits.map((element) => element._source);

        exportData = data;
        // console.log('data-->',data);
        // console.log('fields.showImages-->',fields.showImages);
        // console.log('userCurrency-->',userCurrency);
        // console.log('price-->',price);

        // console.log(response.hits.total)
        const totalRecord = response.hits.total;

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

        // console.log('request.payload-->',JSON.stringify(request.payload, null, 2));
        return reply(GetAllData(response, sortDirections, sortBy, pageSize, page, userCurrency, listFileName));
      })
      .catch(function (error) {
        console.log('error-->',error)
        elastic.close();
        return reply(Boom.badImplementation(err));
      });
    }
};
