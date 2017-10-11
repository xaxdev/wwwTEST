import numberFormat from './convertNumberformat';
import convertDate from './convertDate';
import moment from 'moment';

const title = (responseData, request) => new Promise((resolve, reject) => {
    try {
        let allData = [];
        let exportData = null;
        let fields = request.fields;
        let userCurrency = request.userCurrency;
        let price = request.price;
        let userName = request.userName;
        let listFileName = [];
        let ROOT_URL = request.ROOT_URL;
        let viewAsSet = request.viewAsSet;
        console.log('viewAsSet-->',!!viewAsSet);

        let data = responseData.hits.hits.map((element) => element._source);

        exportData = data;

        let titles = [];

        if (viewAsSet) {
            if (fields.showImagesViewAsSet)
                titles.push('Images');

            titles.push('Item Reference', 'Description');

          if(fields.allFields){
              titles.push('Total Actual Cost (USD)','Total Updated Cost (USD)','Total Public Price (USD)',
                          'Markup (Times)', 'Company','Warehouse', 'Created Date'
                        );
          }else{
              if(fields.totalActualCost) titles.push('Total Actual Cost (USD)');
              if(fields.totalUpdatedCost) titles.push('Total Updated Cost (USD)');
              if(fields.totalPrice) titles.push('Total Public Price (USD)');
              if(fields.markup) titles.push('Markup (Times)');
              if(fields.companyName) titles.push('Company');
              if(fields.warehouseName) titles.push('Warehouse');
              if(fields.createdDate) titles.push('Created Date');
          }
        }else{
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
            titles.push('Gross Weight','Ring Size', 'Jewels Weight (text)','Site','Company', 'Warehouse');
            if(fields.allFields){
              titles.push('Ingredients','Category Name','Category', 'Article', 'Collection','Set Reference Number', 'Cut','Color',
                          'Clarity','Carat Wt', 'Unit', 'Qty','Origin','Symmetry','Flourance','Batch','Net Weight',
                          'Stone Qty','Dominant Stone', 'Markup%','Certificate Number','Certificate Date', 'Vendor Code',
                          'Vendor Name', 'Metal Colour', 'Metal','Brand','Complication','Strap Type','Strap Color',
                          'Buckle Type','Dial Index','Dial Color','Movement','Serial #','Limited Edition',
                          'Limited Edition #','Created Date'
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
              if(fields.itemCreatedDate) titles.push('Created Date');
            }
        }

        return resolve(titles)

    } catch (err) {
        throw err;
    }
});

export { title };
