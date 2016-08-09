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
    let fields = request.payload.fields;
    let price = request.payload.price;

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
        console.log('fields.showImages-->',fields.showImages);
        console.log('userCurrency-->',userCurrency);
        console.log('price-->',price);


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

        console.log('Wirting excel.');

        let titles = [];

        if (fields.showImages)
            titles.push('Images');

        titles.push('Item Reference', 'Item Description', 'SKU', 'Vendor Item Reference');
        if (userCurrency != 'USD') {
          if (price == 'All') {
            titles.push('Actual Price (' + userCurrency + ')');
          }
          if (price == 'Updated' || price == 'All') {
            titles.push('Updated Price (' + userCurrency + ')');
          }
          if (price == 'Public' || price == 'Updated'
              || price == 'All') {
            titles.push('Public Price (' + userCurrency + ')');
          }

          if (price == 'All') {
            titles.push('Actual Price (USD)');
          }
          if (price == 'Updated' || price == 'All') {
            titles.push('Updated Price (USD)');
          }
          if (price == 'Public' || price == 'Updated'
              || price == 'All') {
            titles.push('Public Price (USD)');
          }
        } else {
          if (price == 'All') {
            titles.push('Actual Price (USD)');
          }
          if (price == 'Updated' || price == 'All') {
            titles.push('Updated Price (USD)');
          }
          if (price == 'Public' || price == 'Updated'
              || price == 'All') {
            titles.push('Public Price (USD)');
          }
        }

        titles.push('Gross Weight','Ring Size', 'Jewels Weight (text)','Site','company', 'Warehouse');
        if(fields.allFields){
          titles.push('Ingredients','Category Name','Category', 'Article', 'Collection','Set Reference Number', 'Cut','Color',
                      'Clarity','Carat Wt', 'Unit', 'Qty','Origin','Symmetry','Flourance','Batch','Net Weight',
                      'Stone Qty','Dominant Stone', 'Markup%','Certificate Number','Certificate Date', 'Vendor Code',
                      'Vendor Name', 'Metal Colour', 'Metal','Brand','Complication','Strap Type','Strap Color',
                      'Buckle Type','Dial Index','Dial Color','Movement','Serial #','Limited Edition',
                      'Limited Edition #'
                    );
        }else{
          if(fields.ingredients) titles.push('Ingredients');
          if(fields.categoryName) titles.push('Category Name');
          if(fields.category) titles.push('Category');
          if(fields.article) titles.push('Article');
          if(fields.collection) titles.push('Collection');
          if(fields.setReferenceNumber) titles.push('Set Reference Number');
          if(fields.cut) titles.push('Cut');
          if(fields.color) titles.push('Color');
          if(fields.clarity) titles.push('Clarity');
          if(fields.caratWt) titles.push('Carat Wt');
          if(fields.unit) titles.push('Unit');
          if(fields.qty) titles.push('Qty');
          if(fields.origin) titles.push('Origin');
          if(fields.symmetry) titles.push('Symmetry');
          if(fields.flourance) titles.push('Flourance');
          if(fields.batch) titles.push('Batch');
          if(fields.netWeight) titles.push('Net Weight');
          if(fields.stoneQty) titles.push('Stone Qty');
          if(fields.dominantStone) titles.push('Dominant Stone');
          if(fields.markup) titles.push('Markup%');
          if(fields.certificatedNumber) titles.push('Certificate Number');
          if(fields.certificateDate) titles.push('Certificate Date');
          if(fields.vendorCode) titles.push('Vendor Code');
          if(fields.vendorName) titles.push('Vendor Name');
          if(fields.metalColor) titles.push('Metal Colour');
          if(fields.metalType) titles.push('Metal');
          if(fields.brand) titles.push('Brand');
          if(fields.complication) titles.push('Complication');
          if(fields.strapType) titles.push('Strap Type');
          if(fields.strapColor) titles.push('Strap Color');
          if(fields.buckleType) titles.push('Buckle Type');
          if(fields.dialIndex) titles.push('Dial Index');
          if(fields.dialColor) titles.push('Dial Color');
          if(fields.movement) titles.push('Movement');
          if(fields.serial) titles.push('Serial #');
          if(fields.limitedEdition) titles.push('Limited Edition');
          if(fields.limitedEditionNumber) titles.push('Limited Edition #');
        }

        let  t = 0;

        titles.forEach(function(title){
          t++;
          ws.cell(1,t).string(title).style(style);
        });

        let i = 1;
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
