const Boom = require('boom');
const Hoek = require('hoek');
const Joi = require('joi');
const GetSearch = require('../utils/getSearch');
const GetAllData = require('../utils/getAllData');
// Require library export excel
const xl = require('excel4node');
const _ = require('lodash');

const internals = {
  filters: []
};

module.exports = {
  auth: false,
  handler: (request, reply) => {

    const elastic = request.server.plugins.elastic.client;

    // console.log('request.payload-->',request.payload);

    var obj = request.payload;
    var page = request.payload.page;
    var sortBy = request.payload.sortBy;
    var sortDirections = request.payload.sortDirections;
    var userCurrency = request.payload.userCurrency;
    var keys = Object.keys(obj);
    let that = request.payload.this;

    var size = 8;

    internals.query = GetSearch(request, 0, 100000);
    console.log('searching...');

    // console.log(JSON.stringify(internals.query, null, 2));

    elastic
      .search({
        index: 'mol',
        type: 'items',
        body: internals.query
      }).then(function (response) {
        var allData = [];
        var exportData = null;
        console.log('Response Data');

        var data = response.hits.hits.map((element) => element._source);
        if(sortDirections == 'desc'){
          data = _.sortBy(data,sortBy,sortDirections).reverse();
        }else{
          data = _.sortBy(data,sortBy,sortDirections);
        }

        exportData = data;
        // console.log('data-->',data);


        // console.log(response.hits.total)
        const totalRecord = response.hits.total;

        // Create a new instance of a Workbook class
        var wb = new xl.Workbook();

        // Add Worksheets to the workbook
        var ws = wb.addWorksheet('Items');

        // Create a reusable style
        var style = wb.createStyle({
            font: {
                color: '#FF0800',
                size: 12
            },
            numberFormat: '$#,##0.00; ($#,##0.00); -'
        });

        let i = 0;
        console.log('Wirting excel.');

        data.forEach(function(item){
          i++;
          // allData.push({'id': item.id,'reference':item.reference});
          // Set value of cell A1 to 100 as a number type styled with paramaters of style
          ws.cell(i,1).string(item.id).style(style);
          ws.cell(i,2).string(item.reference).style(style);
        });


        // // Set value of cell A1 to 100 as a number type styled with paramaters of style
        // ws.cell(1,1).number(100).style(style);
        //
        // // Set value of cell B1 to 300 as a number type styled with paramaters of style
        // ws.cell(1,2).number(200).style(style);
        //
        // // Set value of cell C1 to a formula styled with paramaters of style
        // ws.cell(1,3).formula('A1 + B1').style(style);
        //
        // // Set value of cell A2 to 'string' styled with paramaters of style
        // ws.cell(2,1).string('string').style(style);
        //
        // // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
        // ws.cell(3,1).bool(true).style(style).style({font: {size: 14}});

        wb.write('Excel.xlsx');
        console.log('Write excel done.');

        elastic.close();
        return reply(GetAllData(response, sortDirections, sortBy, size, page, userCurrency));

      })
      .catch(function (error) {
        console.log('error-->',error)
        elastic.close();
        return reply(Boom.badImplementation(err));
      });
  }
};
