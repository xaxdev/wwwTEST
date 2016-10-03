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

    // var rabbit = request.server.plugins['hapi-rabbit'];
    // // console.log(rabbit);
    // rabbit.createContext(function(err, context){
    //     if(err){
    //         console.log('err', err);
    //     }
    //
    //     rabbit.publish(context, 'exchange', 'messageType', JSON.stringify(request.payload, null, 2), function(err, data){
    //         console.log('messageObject', data);
    //     });
    // });
    amqp.connect('amqp://guest:guest@192.168.1.92:5672', function(err, conn) {
      conn.createChannel(function(err, ch) {
        var q = 'excel';

        ch.assertQueue(q, {durable: false});
        // Note: on Node 6 Buffer.from(msg) should be used
        ch.sendToQueue(q, new Buffer(JSON.stringify(request.payload, null, 2)));
        console.log(' [x] Sent "Parameter!"');
      });
    });

    const elastic = request.server.plugins.elastic.client;
    // const host = HOSTNAME || 'localhost';
    // const ROOT_URL = (host != 'mol.mouawad.com')? `//${host}:3005`: `//${host}`;

    // console.log('request.payload-->',request.payload);

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

    // console.log(JSON.stringify(internals.query, null, 2));

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

        // Create a new instance of a Workbook class
        // let wb = new xl.Workbook();
        //
        // // Add Worksheets to the workbook
        // let ws = wb.addWorksheet('Items');
        //
        // // Create a reusable style
        // let style = wb.createStyle({
        //     font: {
        //         color: '#000000',
        //         size: 12
        //     },
        //     numberFormat: '$#,##0.00; ($#,##0.00); -'
        // });
        //
        // console.log('Wirting excel.');
        //
        // let titles = [];
        //
        // if (fields.showImages)
        //     titles.push('Images');
        //
        // titles.push('Item Reference', 'Item Description', 'SKU', 'Vendor Item Reference');
        // if (userCurrency != 'USD') {
        //   if (price == 'All') {
        //     titles.push('Actual Price (' + userCurrency + ')');
        //   }
        //   if (price == 'Updated' || price == 'All') {
        //     titles.push('Updated Price (' + userCurrency + ')');
        //   }
        //   if (price == 'Public' || price == 'Updated'
        //       || price == 'All') {
        //     titles.push('Public Price (' + userCurrency + ')');
        //   }
        //
        //   if (price == 'All') {
        //     titles.push('Actual Price (USD)');
        //   }
        //   if (price == 'Updated' || price == 'All') {
        //     titles.push('Updated Price (USD)');
        //   }
        //   if (price == 'Public' || price == 'Updated'
        //       || price == 'All') {
        //     titles.push('Public Price (USD)');
        //   }
        // } else {
        //   if (price == 'All') {
        //     titles.push('Actual Price (USD)');
        //   }
        //   if (price == 'Updated' || price == 'All') {
        //     titles.push('Updated Price (USD)');
        //   }
        //   if (price == 'Public' || price == 'Updated'
        //       || price == 'All') {
        //     titles.push('Public Price (USD)');
        //   }
        // }
        //
        // titles.push('Gross Weight','Ring Size', 'Jewels Weight (text)','Site','company', 'Warehouse');
        // if(fields.allFields){
        //   titles.push('Ingredients','Category Name','Category', 'Article', 'Collection','Set Reference Number', 'Cut','Color',
        //               'Clarity','Carat Wt', 'Unit', 'Qty','Origin','Symmetry','Flourance','Batch','Net Weight',
        //               'Stone Qty','Dominant Stone', 'Markup%','Certificate Number','Certificate Date', 'Vendor Code',
        //               'Vendor Name', 'Metal Colour', 'Metal','Brand','Complication','Strap Type','Strap Color',
        //               'Buckle Type','Dial Index','Dial Color','Movement','Serial #','Limited Edition',
        //               'Limited Edition #'
        //             );
        // }else{
        //   if(fields.ingredients) titles.push('Ingredients');
        //   if(fields.categoryName) titles.push('Category Name');
        //   if(fields.category) titles.push('Category');
        //   if(fields.article) titles.push('Article');
        //   if(fields.collection) titles.push('Collection');
        //   if(fields.setReferenceNumber) titles.push('Set Reference Number');
        //   if(fields.cut) titles.push('Cut');
        //   if(fields.color) titles.push('Color');
        //   if(fields.clarity) titles.push('Clarity');
        //   if(fields.caratWt) titles.push('Carat Wt');
        //   if(fields.unit) titles.push('Unit');
        //   if(fields.qty) titles.push('Qty');
        //   if(fields.origin) titles.push('Origin');
        //   if(fields.symmetry) titles.push('Symmetry');
        //   if(fields.flourance) titles.push('Flourance');
        //   if(fields.batch) titles.push('Batch');
        //   if(fields.netWeight) titles.push('Net Weight');
        //   if(fields.stoneQty) titles.push('Stone Qty');
        //   if(fields.dominantStone) titles.push('Dominant Stone');
        //   if(fields.markup) titles.push('Markup%');
        //   if(fields.certificatedNumber) titles.push('Certificate Number');
        //   if(fields.certificateDate) titles.push('Certificate Date');
        //   if(fields.vendorCode) titles.push('Vendor Code');
        //   if(fields.vendorName) titles.push('Vendor Name');
        //   if(fields.metalColor) titles.push('Metal Colour');
        //   if(fields.metalType) titles.push('Metal');
        //   if(fields.brand) titles.push('Brand');
        //   if(fields.complication) titles.push('Complication');
        //   if(fields.strapType) titles.push('Strap Type');
        //   if(fields.strapColor) titles.push('Strap Color');
        //   if(fields.buckleType) titles.push('Buckle Type');
        //   if(fields.dialIndex) titles.push('Dial Index');
        //   if(fields.dialColor) titles.push('Dial Color');
        //   if(fields.movement) titles.push('Movement');
        //   if(fields.serial) titles.push('Serial #');
        //   if(fields.limitedEdition) titles.push('Limited Edition');
        //   if(fields.limitedEditionNumber) titles.push('Limited Edition #');
        // }
        //
        // let newdata = [];
        //
        // // console.log('data export-->',data.length);
        //
        // data.forEach(function(item){
        //   // console.log('item-->',item);
        //   let arrayItems = [];
        //   let itemReference = item.reference;
        //
        //   if (fields.showImages)
        //     arrayItems.push((item.gallery.length) != 0
        //                       ? 'http://' + ROOT_URL + item.gallery[0].thumbnail
        //                       : 'http://' + ROOT_URL + '/images/blank.gif');
        //
        //   arrayItems.push(item.reference,item.description,item.sku,item.venderReference);
        //
        //   if (userCurrency != 'USD') {
        //     if (price == 'All') {
        //       // console.log('item.actualCost-->',item.actualCost);
        //       arrayItems.push(numberFormat((item.actualCost != undefined)? item.actualCost[userCurrency]: 0 ));
        //     }
        //     if (price == 'Updated' || price == 'All') {
        //       arrayItems.push(numberFormat((item.updatedCost != undefined)? item.updatedCost[userCurrency]: 0 ));
        //     }
        //     if (price == 'Public' || price == 'Updated'
        //         || price == 'All') {
        //       arrayItems.push(numberFormat((item.price != undefined)? item.price[userCurrency]: 0 ));
        //     }
        //
        //     if (price == 'All') {
        //       arrayItems.push(numberFormat((item.actualCost != undefined)? item.actualCost['USD']: 0));
        //     }
        //     if (price == 'Updated' || price == 'All') {
        //       arrayItems.push(numberFormat((item.updatedCost != undefined)? item.updatedCost['USD']: 0));
        //     }
        //     if (price == 'Public' || price == 'Updated'
        //         || price == 'All') {
        //       arrayItems.push(numberFormat((item.price != undefined)? item.price['USD']: 0));
        //     }
        //   }else{
        //     if (price == 'All') {
        //       // console.log('item.actualCost-->',item.actualCost);
        //       arrayItems.push(numberFormat((item.actualCost != undefined)? item.actualCost['USD']: 0));
        //     }
        //     if (price == 'Updated' || price == 'All') {
        //       arrayItems.push(numberFormat((item.updatedCost != undefined)? item.updatedCost['USD']: 0));
        //     }
        //     if (price == 'Public' || price == 'Updated'
        //         || price == 'All') {
        //       arrayItems.push(numberFormat((item.price != undefined)? item.price['USD']: 0));
        //     }
        //   }
        //   let jewelsWeight = 0;
        //   // console.log('forEach-->1');
        //   if(item.gemstones != undefined){
        //     item.gemstones.forEach(function(gemstone) {
        //       // console.log('forEach-->1.1');
        //       if(gemstone.carat != undefined){
        //         jewelsWeight = jewelsWeight + gemstone.carat;
        //       }
        //     });
        //   }
        //
        //   arrayItems.push((item.grossWeight != undefined) ? item.grossWeight : '',
        //                   (item.size != undefined) ? item.size : '',
        //                   jewelsWeight,
        //                   (item.site != undefined) ? item.site : '',
        //                   (item.company != undefined) ? item.company : '',
        //                   (item.warehouse != undefined) ? item.warehouse : '',
        //                 );
        //
        //   if(fields.allFields){
        //     arrayItems.push('Main',
        //                     (item.hierarchy != undefined) ? item.hierarchy.split('\\').pop() : '',
        //                     (item.type == 'ACC' || item.type == 'OBA' || item.type == 'SPP') ? item.subType : '', // category
        //                     (item.type == 'JLY' || item.type == 'WAT' || item.type == 'STO') ? item.subType : '', // article
        //                     (item.collectionName != undefined) ? item.collectionName : '',
        //                     (item.setReference != undefined) ? item.setReference : '',
        //                     (item.cut != undefined) ? item.cut : '',
        //                     (item.color != undefined) ? item.color : '',
        //                     (item.clarity != undefined) ? item.clarity : '',
        //                     (item.carat != undefined) ? item.carat : 0,
        //                     (item.unit != undefined) ? item.unit : '',
        //                     (item.quantity != undefined) ? item.quantity : '',
        //                     (item.origin != undefined) ? item.origin : '',
        //                     (item.symmetry != null) ? item.symmetry : '',
        //                     (item.fluorescence != undefined) ? item.fluorescence : '',
        //                     (item.lotNumber != undefined) ? item.lotNumber : '',
        //                     (item.netWeight != undefined) ? item.netWeight : ''
        //                   );
        //                     let stoneQty = 0;
        //                     if(item.gemstones != undefined){
        //                       item.gemstones.forEach(function(gemstone) {
        //                         if(gemstone.quantity != undefined){
        //                           stoneQty = stoneQty + gemstone.quantity;
        //                         }
        //                       });
        //                     }
        //     arrayItems.push(stoneQty,
        //                     (item.dominantStoneName != undefined) ? item.dominantStoneName : '',
        //                     (item.markup != undefined) ? item.markup : '',
        //                     '',
        //                     '',
        //                     (item.vendor != undefined) ? item.vendor : '',
        //                     (item.vendorName != undefined) ? item.vendorName : '',
        //                     (item.metalColorName != undefined) ? item.metalColorName : '',
        //                     (item.metalTypeName != undefined) ? item.metalTypeName : '',
        //                     (item.brandName != undefined) ? item.brandName : '',
        //                     (item.complicationName != undefined) ? item.complicationName : '',
        //                     (item.strapTypeName != undefined) ? item.strapTypeName : '',
        //                     (item.strapColorName != undefined) ? item.strapColorName : '',
        //                     (item.buckleTypeName != undefined) ? item.buckleTypeName : '',
        //                     (item.dialIndexName != undefined) ? item.dialIndexName : '',
        //                     (item.dialColorName != undefined) ? item.dialColorName : '',
        //                     (item.movementName != undefined) ? item.movementName : '',
        //                     (item.serialNumber != undefined) ? item.serialNumber : '',
        //                     (item.limitedEdition != undefined) ? (item.limitedEdition) ? 'Yes' : 'No' : 'No',
        //                     (item.limitedEditionNumber != undefined) ? item.limitedEditionNumber : ''
        //                   );
        //
        //   }else{
        //     if(fields.ingredients) arrayItems.push('Main');
        //     if(fields.categoryName) arrayItems.push((item.hierarchy != undefined) ? item.hierarchy.split('\\').pop() : '');
        //     if(fields.category) arrayItems.push((item.type == 'ACC' || item.type == 'OBA' || item.type == 'SPP') ? item.subType : '');
        //     if(fields.article) arrayItems.push((item.type == 'JLY' || item.type == 'WAT' || item.type == 'STO') ? item.subType : '');
        //     if(fields.collection) arrayItems.push((item.collectionName != undefined) ? item.collectionName : '');
        //     if(fields.setReferenceNumber) arrayItems.push((item.setReference != undefined) ? item.setReference : '');
        //     if(fields.cut) arrayItems.push((item.cut != undefined) ? item.cut : '');
        //     if(fields.color) arrayItems.push((item.color != undefined) ? item.color : '');
        //     if(fields.clarity) arrayItems.push((item.clarity != undefined) ? item.clarity : '');
        //     if(fields.caratWt) arrayItems.push((item.carat != undefined) ? item.carat : 0);
        //     if(fields.unit) arrayItems.push((item.unit != undefined) ? item.unit : '');
        //     if(fields.qty) arrayItems.push((item.quantity != null) ? item.quantity : '');
        //     if(fields.origin) arrayItems.push((item.origin != undefined) ? item.origin : '');
        //     if(fields.symmetry) arrayItems.push((item.symmetry != undefined) ? item.symmetry : '');
        //
        //     if(fields.flourance) arrayItems.push((item.fluorescence != undefined) ? item.fluorescence : '');
        //     if(fields.batch) arrayItems.push((item.lotNumber != undefined) ? item.lotNumber : '');
        //     if(fields.netWeight) arrayItems.push((item.netWeight != undefined) ? item.netWeight : '');
        //     let stoneQty = 0;
        //         if(item.gemstones != undefined){
        //           item.gemstones.forEach(function(gemstone) {
        //             if(gemstone.quantity != undefined){
        //               stoneQty = stoneQty + gemstone.quantity;
        //             }
        //           });
        //         }
        //
        //     if(fields.stoneQty) arrayItems.push((stoneQty != 0) ? stoneQty : 0);
        //     if(fields.dominantStone) arrayItems.push((item.dominantStoneName != undefined) ? item.dominantStoneName : '');
        //     if(fields.markup) arrayItems.push((item.markup != undefined) ? item.markup : '');
        //     if(fields.certificatedNumber) arrayItems.push('');
        //     if(fields.certificateDate) arrayItems.push('');
        //     if(fields.vendorCode) arrayItems.push((item.vendor != undefined) ? item.vendor : '');
        //     if(fields.vendorName) arrayItems.push((item.vendorName != undefined) ? item.vendorName : '');
        //     if(fields.metalColor) arrayItems.push((item.metalColorName != undefined) ? item.metalColorName : '');
        //     if(fields.metalType) arrayItems.push((item.metalTypeName != undefined) ? item.metalTypeName : '');
        //     if(fields.brand) arrayItems.push((item.brandName != undefined) ? item.brandName : '');
        //     if(fields.complication) arrayItems.push((item.complicationName != undefined) ? item.complicationName : '');
        //     if(fields.strapType) arrayItems.push((item.strapTypeName != undefined) ? item.strapTypeName : '');
        //     if(fields.strapColor) arrayItems.push((item.strapColorName != undefined) ? item.strapColorName : '');
        //     if(fields.buckleType) arrayItems.push((item.buckleTypeName != undefined) ? item.buckleTypeName : '');
        //     if(fields.dialIndex) arrayItems.push((item.dialIndexName != undefined) ? item.dialIndexName : '');
        //     if(fields.dialColor) arrayItems.push((item.dialColorName != undefined) ? item.dialColorName : '');
        //     if(fields.movement) arrayItems.push((item.movementName != undefined) ? item.movementName : '');
        //     if(fields.serial) arrayItems.push((item.serialNumber != undefined) ? item.serialNumber : '');
        //     if(fields.limitedEdition) arrayItems.push((item.limitedEdition != undefined) ? (item.limitedEdition) ? 'Yes' : 'No' : 'No');
        //     if(fields.limitedEditionNumber) arrayItems.push((item.limitedEditionNumber != undefined) ? item.limitedEditionNumber : '');
        //   }
        //
        //   if(item.gemstones != undefined){
        //     if(item.gemstones.length == 0){
        //       newdata.push(arrayItems);
        //
        //     }else{
        //       newdata.push(arrayItems);
        //
        //       if(fields.ingredients || fields.allFields){
        //         item.gemstones.forEach(function(gemstone) {
        //           arrayItems = [];
        //         if (fields.showImages)
        //             arrayItems.push(''); // images
        //
        //           arrayItems.push(itemReference, // Item Reference
        //                           '', // Item Description
        //                           (gemstone.stoneTypeId != undefined) ? gemstone.stoneTypeId : '', // sku
        //                           ''); // Vendor ref
        //           if (userCurrency != 'USD') {
        //             if (price == 'All') {
        //               arrayItems.push(numberFormat((gemstone.cost[userCurrency] != undefined)? gemstone.cost[userCurrency]: 0 )); // actual Price
        //             }
        //             if (price == 'Updated' || price == 'All') {
        //               arrayItems.push(''); // updated Price
        //             }
        //             if (price == 'Public' || price == 'Updated'
        //               || price == 'All') {
        //               arrayItems.push('');// Public Price
        //             }
        //
        //             if (price == 'All') {
        //                 arrayItems.push(numberFormat((gemstone.cost['USD'] != undefined)? gemstone.cost['USD']: 0 )); // actual Price (USD)
        //             }
        //             if (price == 'Updated' || price == 'All') {
        //                 arrayItems.push(''); // updated Price (USD)
        //             }
        //             if (price == 'Public' || price == 'Updated'
        //                 || price == 'All') {
        //                 arrayItems.push('');// Public Price (USD)
        //             }
        //           }else{
        //             if (price == 'All') {
        //               arrayItems.push(numberFormat((gemstone.cost['USD'] != undefined)? gemstone.cost['USD']: 0 ));// actual Price (USD)
        //             }
        //             if (price == 'Updated' || price == 'All') {
        //               arrayItems.push(''); // updated Price (USD)
        //             }
        //             if (price == 'Public' || price == 'Updated'
        //                 || price == 'All') {
        //               arrayItems.push('');// Public Price (USD)
        //             }
        //           }
        //
        //           arrayItems.push('', // Gross Weight
        //                           '', // Ring Size
        //                           '', // Jewels Weight
        //                           '', // Site
        //                           '', // Company
        //                           ''); // Warehouse
        //
        //           arrayItems.push('Ingredient');
        //             if(fields.categoryName || fields.allFields) arrayItems.push(''); // Category Name
        //             if(fields.category || fields.allFields) arrayItems.push(''); // Category
        //             if(fields.article || fields.allFields) arrayItems.push(''); // article
        //             if(fields.collection || fields.allFields) arrayItems.push(''); // Collection
        //             if(fields.setReferenceNumber || fields.allFields) arrayItems.push(''); // Set Reference Number
        //             if(fields.cut || fields.allFields) arrayItems.push((gemstone.cut != undefined) ? gemstone.cut : ''); // Cut
        //             if(fields.color || fields.allFields) arrayItems.push((gemstone.color != undefined) ? gemstone.color : ''); // Color
        //             if(fields.clarity || fields.allFields) arrayItems.push((gemstone.clarity != undefined) ? gemstone.clarity : ''); // Clarity
        //             if(fields.caratWt || fields.allFields) arrayItems.push((gemstone.carat != undefined) ? gemstone.carat : ''); // Carat Wt
        //             if(fields.unit || fields.allFields) arrayItems.push((gemstone.unit != undefined) ? gemstone.unit : ''); // Unit
        //             if(fields.qty || fields.allFields) arrayItems.push((gemstone.quantity != undefined) ? gemstone.quantity : ''); // Qty
        //             if(fields.origin || fields.allFields) arrayItems.push((gemstone.origin != undefined) ? gemstone.origin : ''); // Origin
        //             if(fields.symmetry || fields.allFields) arrayItems.push((gemstone.symmetry != undefined) ? gemstone.symmetry : ''); // symmetry
        //             if(fields.flourance || fields.allFields) arrayItems.push((gemstone.fluorescence != undefined) ? gemstone.fluorescence : ''); // Flourance
        //             if(fields.batch || fields.allFields) arrayItems.push(''); // Batch lot number
        //             if(fields.netWeight || fields.allFields) arrayItems.push(''); // Net Weight
        //             if(fields.stoneQty || fields.allFields) arrayItems.push(0); // Stone Qty
        //             if(fields.dominantStone || fields.allFields) arrayItems.push(''); // Dominant Stone
        //             if(fields.markup || fields.allFields) arrayItems.push(''); // Markup%
        //             if(fields.certificatedNumber || fields.allFields) arrayItems.push((gemstone.certificate != undefined) ? gemstone.certificate.number : ''); // Certificate Number
        //             if(fields.certificateDate || fields.allFields) arrayItems.push((gemstone.certificate != undefined) ? convertDate(gemstone.certificate.issuedDate) : ''); // Certificate Date
        //             if(fields.vendorCode || fields.allFields) arrayItems.push(''); // Vendor Code
        //             if(fields.vendorName || fields.allFields) arrayItems.push(''); // Vendor Name
        //             if(fields.metalColor || fields.allFields) arrayItems.push(''); // Metal Color
        //             if(fields.metalType || fields.allFields) arrayItems.push(''); // Metal
        //             if(fields.brand || fields.allFields) arrayItems.push(''); // Brand
        //             if(fields.complication || fields.allFields) arrayItems.push(''); // Complication
        //             if(fields.strapType || fields.allFields) arrayItems.push(''); // Strap Type
        //             if(fields.strapColor || fields.allFields) arrayItems.push(''); // Strap Color
        //             if(fields.buckleType || fields.allFields) arrayItems.push(''); // Buckle Type
        //             if(fields.dialIndex || fields.allFields) arrayItems.push(''); // Dial Index
        //             if(fields.dialColor || fields.allFields) arrayItems.push(''); // Dial Color
        //             if(fields.movement || fields.allFields) arrayItems.push(''); // Movement
        //             if(fields.serial || fields.allFields) arrayItems.push(''); // Serial #
        //             if(fields.limitedEdition || fields.allFields) arrayItems.push((item.limitedEdition != undefined) ? (item.limitedEdition) ? 'Yes' : 'No' : 'No'); // Limited Edition
        //             if(fields.limitedEditionNumber || fields.allFields) arrayItems.push(''); // Limited Edition #
        //           newdata.push(arrayItems);
        //         });
        //       }
        //     }
        //   }
        // });
        //
        // let alldata = newdata.length;
        // console.log('alldata-->',newdata.length);
        // let exportSize = Math.ceil(alldata/30000);
        //
        // let chunks = [];
        // let i = 0;
        // let file = 0;
        //
        // while (i < alldata) {
        //   chunks.push(newdata.slice(i, i += 30000));
        // }
        //
        // console.log('chunks-->',chunks.length);
        //
        // chunks.forEach(function (chunk) {
        //   file++;
        //   console.log('file-->',file);
        //   // Create a new instance of a Workbook class
        //   let wb = new xl.Workbook();
        //
        //   // Add Worksheets to the workbook
        //   let ws = wb.addWorksheet('Items');
        //
        //   // Create a reusable style
        //   let style = wb.createStyle({
        //       font: {
        //           color: '#000000',
        //           size: 12
        //       },
        //       numberFormat: '$#,##0.00; ($#,##0.00); -'
        //   });
        //
        //   let  t = 0;
        //   titles.forEach(function(title){
        //     t++;
        //     ws.cell(1,t).string(title).style(style);
        //   });
        //
        //   let i = 1;
        //   chunk.forEach(function(item){
        //     i++;
        //     // allData.push({'id': item.id,'reference':item.reference});
        //     // Set value of cell A1 to 100 as a number type styled with paramaters of style
        //     if(i>=2){
        //       // console.log('t-->',t);
        //       // console.log('item-->',item);
        //       for (let j = 0; j < t; j++) {
        //         // console.log('i-->',i);
        //         // console.log('j-->',j);
        //         // console.log('item[j]-->',item[j]);
        //         let row = i;
        //         let column = j+1;
        //         ws.cell(row,column).string((item[j] != undefined) ? item[j].toString() : '').style(style);
        //         if (fields.showImages){
        //           ws.addImage({
        //               path: './plugins/http/assets/images/blank.gif',
        //               type: 'picture',
        //               position: {
        //                   type: 'oneCellAnchor',
        //                   from: {
        //                       col: 1,
        //                       colOff: '0.0in',
        //                       row: 1,
        //                       rowOff: 0
        //                   }
        //               }
        //           });
        //         }
        //       }
        //     }
        //     // console.log('item.reference-->',item[0]);
        //     // console.log('item.description-->',item[1]);
        //     // ws.cell(i,1).string(item[0]).style(style);
        //     // ws.cell(i,2).string(item[1]).style(style);
        //
        //   });
        //   let startDate = new Date();
        //   let exportDate = moment(startDate,'MM-DD-YYYY');
        //   exportDate = exportDate.format('YYYYMMDD_HHmm');
        //
        //   let fileName = file + '_' + 'Excel_' + userName + '_' + exportDate + '.xlsx';
        //   console.log('fileName-->',fileName);
        //
        //   wb.write(fileName, function (err, stats) {
        //       if (err) {
        //           console.error(err);
        //       }
        //       console.log('Write excel done.'); // Prints out an instance of a node.js fs.Stats object
        //
        //       console.log(Path.resolve(__dirname, '../../../../code/' + fileName));
        //       listFileName.push(ROOT_URL +'/export_files/'+ fileName);
        //       // console.log('listFileName-->',listFileName[0]);
        //
        //       let _pathDistFile = Path.resolve(__dirname, '../../../../code/plugins/http/public/export_files');
        //       let _pathSourceFile = Path.resolve(__dirname, '../../../../code/' + fileName);
        //       let readStream = fs.createReadStream(_pathSourceFile); // current file
        //       let writeStream = fs.createWriteStream(_pathDistFile + '/' + fileName);
        //
        //       readStream   // reads current file
        //       .pipe(writeStream)  // writes to out file
        //       .on('finish', function () {  // all done
        //         console.log('copy done');
        //         fs.unlink(_pathSourceFile,function(err){
        //           if(err) return console.log(err);
        //           console.log('file deleted successfully');
        //           // elastic.close();
        //           // // console.log('Write excel done.');
        //           // return reply(GetAllData(response, sortDirections, sortBy, pageSize, page, userCurrency, listFileName));
        //         });
        //       });
        //   });
        // });
        elastic.close();
        return reply(GetAllData(response, sortDirections, sortBy, pageSize, page, userCurrency, listFileName));
      })
      .catch(function (error) {
        console.log('error-->',error)
        elastic.close();
        return reply(Boom.badImplementation(err));
      });
    }
};
