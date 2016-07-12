const Boom = require('boom');
const Hoek = require('hoek');
const Joi = require('joi');
const GetSearch = require('../utils/getSearch');
const GetAllDataLessThane = require('../utils/getAllDataLessThane');

const internals = {
  filters: []
};

module.exports = {
  auth: false,
  handler: (request, reply) => {

    const elastic = request.server.plugins.elastic.client;
    // console.log('request.payload-->',request.payload);
    // const keys = Object.keys(request.payload);

    var obj = request.payload;
    var page = request.payload.page;
    var sortBy = request.payload.sortBy;
    var sortDirections = request.payload.sortDirections;
    var userCurrency = request.payload.userCurrency;
    var keys = Object.keys(obj);

    var size = 8;

    internals.query = GetSearch(request, 0, 10000);

    console.log(JSON.stringify(internals.query, null, 2));

    elastic
      .search({
        index: 'mol',
        type: 'items',
        body: internals.query
      }).then(function (response) {
        // console.log(response.hits.total)
        const totalRecord = response.hits.total;

        // if(totalRecord < 10000){

          // console.log(JSON.stringify(sendData, null, 4));
          // console.log({sendData});
          elastic.close();
          return reply(GetAllDataLessThane(response, sortDirections, sortBy, size, page, userCurrency));
        // }else{
        //   var allData = [];
        //   var sumPriceData = [];
        //   var sumCostData = [];
        //
        //   const someData = GetAllData(response, sortDirections, sortBy, size, page, userCurrency);
        //
        //   for (var i = 20001; i < totalRecord; i += 10000) {
        //     console.log('i-->',i);
        //   }
        // //   console.log('data more than 10,000');
        // //   const sendData = {
        // //           'data':0,
        // //           'allData':0,
        // //           'summary':{
        // //               'count': 0,
        // //               'price': 0,
        // //               'cost': 0
        // //             }
        // //           }
        //   elastic.close();
        //   return reply(someData);
        // }


      })
      .catch(function (error) {
        console.log('error-->',error)
        elastic.close();
        return reply(Boom.badImplementation(err));
      });
  }
};
