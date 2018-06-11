import numberFormat from './convertNumberformat';
import convertDate from './convertDate';
import moment from 'moment';
import GetSalesPricePermission from './getSalesPricePermission';

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
                titles.push('Total Actual Cost (USD)');
            }
            if (priceSalesUCP) {
                titles.push('Total Updated Cost (USD)');
            }
            if (priceSalesRTP) {
                titles.push('Total Public Price (USD)');
            }

            if(fields.allFieldsViewAsSet){
                titles.push('Markup (Times)', 'Company','Location', 'Posted Date');
            }else{
                if(fields.totalActualCost) titles.push('Total Actual Cost (USD)');
                if(fields.totalUpdatedCost) titles.push('Total Updated Cost (USD)');
                if(fields.totalPrice) titles.push('Total Public Price (USD)');
                if(fields.markup) titles.push('Markup (Times)');
                if(fields.companyName) titles.push('Company');
                if(fields.warehouseName) titles.push('Location');
                if(fields.postedDate) titles.push('Posted Date');
            }
        }else{
            if (fields.showImages)
                titles.push('Images');

            titles.push('Item Reference', 'Item Description', 'SKU');
            if (userCurrency != 'USD') {
                if (priceSalesCTP) {
                    titles.push('Actual Price (' + userCurrency + ')');
                }
                if (priceSalesUCP) {
                    titles.push('Updated Price (' + userCurrency + ')');
                }
                if (priceSalesRTP) {
                    titles.push('Public Price (' + userCurrency + ')');
                }
                if (priceSalesCTP) {
                    titles.push('Actual Price (USD)');
                }
                if (priceSalesUCP) {
                    titles.push('Updated Price (USD)');
                }
                if (priceSalesRTP) {
                    titles.push('Public Price (USD)');
                }
                if (priceSalesNSP) {
                    titles.push('Net Sales');
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
            } else {
                if (priceSalesCTP) {
                    titles.push('Actual Price (USD)');
                }
                if (priceSalesUCP) {
                    titles.push('Updated Price (USD)');
                }
                if (priceSalesRTP) {
                    titles.push('Public Price (USD)');
                }
                if (priceSalesNSP) {
                    titles.push('Net Sales');
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
            }
            titles.push('Item Weight (Grams)','Ring Size', 'Jewels Weight (text)','Site','Company', 'Location');
            if(fields.allFields){
                titles.push(
                    'Category Name','Category', 'Article', 'Collection','Set Reference Number', 'Qty', 'Markup%', 'Certificate Number', 'Dominant Stone',
                    'Brand', 'Posted Date', 'Sales Id','Sales Person Name','Sales Channel Type', 'Customer','Customer Name','Invoiced Id','Invoice Date','Size'
                );
            }else{
                if(fields.categoryName) titles.push('Category Name');
                if(fields.category) titles.push('Category');
                if(fields.article) titles.push('Article');
                if(fields.collection) titles.push('Collection');
                if(fields.setReferenceNumber) titles.push('Set Reference Number');
                if(fields.qty) titles.push('Qty');
                if(fields.markup) titles.push('Markup%');
                if(fields.certificatedNumber) titles.push('Certificate Number');
                if(fields.dominantStone) titles.push('Dominant Stone');
                if(fields.brand) titles.push('Brand');
                if(fields.postedDate) titles.push('Posted Date');
                if(fields.salesId) titles.push('Sales Id');
                if(fields.salesPersonName) titles.push('Sales Person Name');
                if(fields.salesChannelType) titles.push('Sales Channel Type');
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
