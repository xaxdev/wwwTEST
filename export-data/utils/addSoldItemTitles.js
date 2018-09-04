import numberFormat from './convertNumberformat';
import convertDate from './convertDate';
import moment from 'moment';
import GetSalesPricePermission from './getSalesPricePermission';

const title = (responseData, request) => new Promise((resolve, reject) => {
    try {
        let allData = [];
        let exportData = null;
        let fields = request.fields;
        let userCurrency = 'USD';
        let price = request.price;
        let userName = request.userName;
        let listFileName = [];
        let ROOT_URL = request.ROOT_URL;
        let viewAsSet = request.viewAsSet;
        let data = responseData;

        exportData = data;

        let titles = [];

        const priceSalesRTP = GetSalesPricePermission(price).priceSalesRTP;
        const priceSalesUCP = GetSalesPricePermission(price).priceSalesUCP;
        const priceSalesCTP = GetSalesPricePermission(price).priceSalesCTP;
        const priceSalesNSP = GetSalesPricePermission(price).priceSalesNSP;
        const priceSalesMGP = GetSalesPricePermission(price).priceSalesMGP;
        const priceSalesDSP = GetSalesPricePermission(price).priceSalesDSP;

        if (viewAsSet) {
            if (fields.showImagesViewAsSet)
                titles.push('Images');

            titles.push('Item Reference', 'Description');

            if (priceSalesCTP) {
                titles.push('Total Cost Price (USD)');
            }
            if (priceSalesUCP) {
                titles.push('Total Updated Cost (USD)');
            }
            if (priceSalesRTP) {
                titles.push('Total Price (USD)');
            }

            if(fields.allFieldsViewAsSet){
                if (priceSalesUCP) {
                    titles.push('Markup (Times)');
                }
                titles.push('Company','Location', 'Posted Date');
            }else{
                if(fields.totalActualCost) titles.push('Total Cost Price (USD)');
                if(fields.totalUpdatedCost) titles.push('Total Updated Cost (USD)');
                if(fields.totalPrice) titles.push('Total Price (USD)');
                if(fields.markup) titles.push('Markup (Times)');
                if(fields.companyName) titles.push('Company');
                if(fields.warehouseName) titles.push('Location');
                if(fields.postedDate) titles.push('Posted Date');
            }
        }else{
            if (fields.showImages)
                titles.push('Images');

            titles.push('Item Reference', 'Item Description', 'SKU');
            if (priceSalesCTP) {
                titles.push('Cost Price (USD)');
            }
            if (priceSalesUCP) {
                titles.push('Updated Price (USD)');
            }
            if (priceSalesRTP) {
                titles.push('Price (USD)');
            }
            if (priceSalesNSP) {
                titles.push('Net Sales (USD)');
            }
            if (priceSalesMGP) {
                titles.push('Margin %');
            }
            if (priceSalesMGP) {
                titles.push('Margin Amount');
            }
            if (priceSalesDSP) {
                titles.push('Discount %');
            }
            if (priceSalesDSP) {
                titles.push('Discount Amount');
            }
            titles.push('Item Weight (Grams)','Ring Size', 'Jewels Weight (text)','Site','Company', 'Location');
            if(fields.allFields){
                titles.push(
                    'Ingredients','Category Name','Category', 'Article', 'Collection','Set Reference Number', 'Cut','Color', 'Clarity','Carat Wt', 'Unit',
                    'Qty','Origin','Symmetry','Flourance','Batch','Gold weight (Grams)', 'Stone Qty','Dominant Stone'
                );
                if (priceSalesUCP) {
                    titles.push('Markup%');
                }
                titles.push(
                    'Certificate Number','Certificate Date','Vendor Code', 'Vendor Name', 'Metal Colour', 'Metal','Brand','Complication',
                    'Strap Type','Strap Color', 'Buckle Type','Dial Index','Dial Color','Movement','Serial #','Limited Edition',
                    'Limited Edition #','Created Date','Posted Date', 'Sales Id','Sales Person Name',
                    'Sales Channel Type', 'Customer','Customer Name','Invoiced Id', 'Invoice Date','Size'
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
                if(fields.netWeight) titles.push('Gold weight (Grams)');
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
                if(fields.postedDate) titles.push('Posted Date');
                if(fields.salesId) titles.push('Sales Id');
                if(fields.salesPersonName) titles.push('Sales Person Name');
                if(fields.salesChannel) titles.push('Sales Channel Type');
                if(fields.customer) titles.push('Customer');
                if(fields.customerName) titles.push('Customer Name');
                if(fields.invoicedId) titles.push('Invoiced Id');
                if(fields.invoiceDate) titles.push('Invoice Date');
                if(fields.inventSizeId) titles.push('Size');
            }
        }

        return resolve(titles)

    } catch (err) {
        throw err;
    }
});

export { title };
