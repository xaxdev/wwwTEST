import numberFormat from './convertNumberformat';
import convertDate from './convertDate';
import moment from 'moment';
import GetSalesPricePermission from './getSalesPricePermission';

const setitems = (responseData, request) => new Promise((resolve, reject) => {
    try {
        let allData = [];
        let exportData = null;
        let fields = request.fields;
        let userCurrency = request.userCurrency;
        let price = request.price;
        let userName = request.userName;
        let listFileName = [];
        let ROOT_URL = request.ROOT_URL;
        let data = responseData.hits.hits.map((element) => element._source);

        exportData = data;

        let newdata = [];

        let items = 0;

        const priceSalesRTP = GetSalesPricePermission(price).priceSalesRTP;
        const priceSalesUCP = GetSalesPricePermission(price).priceSalesUCP;
        const priceSalesCTP = GetSalesPricePermission(price).priceSalesCTP;
        const priceSalesNSP = GetSalesPricePermission(price).priceSalesNSP;
        const priceSalesMGP = GetSalesPricePermission(price).priceSalesMGP;
        const priceSalesDSP = GetSalesPricePermission(price).priceSalesDSP;

        data.forEach(function(item){
            items = items+1;
            // console.log('item-->',item);
            let arrayItems = [];
            let itemReference = item.reference;

            if (fields.showImagesViewAsSet){
                arrayItems.push((item.image.length) != 0 ? item.image[0].thumbnail : '');
            }
            // console.log(`items: ${items}--> reference: ${item.reference}`);
            arrayItems.push(item.reference,item.description);

            if (priceSalesCTP) {
                arrayItems.push(numberFormat((item.totalActualCost != undefined)? item.totalActualCost['USD']: 0));
            }
            if (priceSalesUCP) {
                arrayItems.push(numberFormat((item.totalUpdatedCost != undefined)? item.totalUpdatedCost['USD']: 0));
            }
            if (priceSalesRTP) {
                arrayItems.push(numberFormat((item.totalPrice != undefined)? item.totalPrice['USD']: 0));
            }

            if(fields.allFieldsViewAsSet){
                arrayItems.push(
                    (item.markup != undefined) ? item.markup : '',
                    (item.companyName != undefined) ? item.companyName : '',
                    (item.warehouseName != undefined) ? item.warehouseName : '',
                    (item.postedDate != undefined) ? convertDate(item.postedDate) : ''
                );
            }else{
                if(fields.totalActualCost) arrayItems.push(numberFormat((item.totalActualCost != undefined)? item.totalActualCost['USD']: 0));
                if(fields.totalUpdatedCost) arrayItems.push(numberFormat((item.totalUpdatedCost != undefined)? item.totalUpdatedCost['USD']: 0));
                if(fields.totalPrice) arrayItems.push(numberFormat((item.totalPrice != undefined)? item.totalPrice['USD']: 0));
                if(fields.markup) arrayItems.push((item.markup != undefined) ? item.markup : '');
                if(fields.companyName) arrayItems.push((item.companyName != undefined) ? item.companyName : '');
                if(fields.warehouseName) arrayItems.push((item.warehouseName != undefined) ? item.warehouseName : '');
                if(fields.postedDate) arrayItems.push((item.postedDate != undefined) ? convertDate(item.postedDate) : '');
            }
            newdata.push(arrayItems);
        });

        return resolve(newdata)

    } catch (err) {
        throw err;
    }
});

const ingredient = (responseData, request) => new Promise((resolve, reject) => {
    try {
        let allData = [];
        let exportData = null;
        let fields = request.fields;
        let userCurrency = request.userCurrency;
        let price = request.price;
        let userName = request.userName;
        let listFileName = [];
        let ROOT_URL = request.ROOT_URL;
        let data = responseData.hits.hits.map((element) => element._source);

        exportData = data;

        let newdata = [];

        let items = 0;

        const priceSalesRTP = GetSalesPricePermission(price).priceSalesRTP;
        const priceSalesUCP = GetSalesPricePermission(price).priceSalesUCP;
        const priceSalesCTP = GetSalesPricePermission(price).priceSalesCTP;
        const priceSalesNSP = GetSalesPricePermission(price).priceSalesNSP;
        const priceSalesMGP = GetSalesPricePermission(price).priceSalesMGP;
        const priceSalesDSP = GetSalesPricePermission(price).priceSalesDSP;

        data.forEach(function(item){
            items = items+1;
            // console.log('item-->',item);
            let arrayItems = [];
            let itemReference = item.reference;

            if (fields.showImages){
                arrayItems.push((item.gallery.length) != 0 ? item.gallery[0].thumbnail : '');
            }

            arrayItems.push(item.reference,item.description,item.sku);
            if (userCurrency != 'USD') {
                if (priceSalesCTP) {
                    arrayItems.push(numberFormat((item.actualCost != undefined)? item.actualCost[userCurrency]: 0 ));
                }
                if (priceSalesUCP) {
                    arrayItems.push(numberFormat((item.updatedCost != undefined)? item.updatedCost[userCurrency]: 0 ));
                }
                if (priceSalesRTP) {
                    arrayItems.push(numberFormat((item.price != undefined)? item.price[userCurrency]: 0 ));
                }

                if (priceSalesCTP) {
                    arrayItems.push(numberFormat((item.actualCost != undefined)? item.actualCost['USD']: 0));
                }
                if (priceSalesUCP) {
                    arrayItems.push(numberFormat((item.updatedCost != undefined)? item.updatedCost['USD']: 0));
                }
                if (priceSalesRTP) {
                    arrayItems.push(numberFormat((item.price != undefined)? item.price['USD']: 0));
                }
                if (priceSalesNSP) {
                    arrayItems.push(numberFormat((item.netAmount != undefined)? item.netAmount[userCurrency]: 0));
                }
                if (priceSalesNSP) {
                    arrayItems.push(numberFormat((item.netAmount != undefined)? item.netAmount['USD']: 0));
                }
                if (priceSalesMGP) {
                    arrayItems.push(numberFormat((item.margin != undefined)? (item.margin[userCurrency]/item.netAmount[userCurrency])*100: 0));
                }
                if (priceSalesMGP) {
                    arrayItems.push(numberFormat((item.margin != undefined)? item.margin[userCurrency]: 0));
                }
                if (priceSalesDSP) {
                    arrayItems.push(numberFormat((item.discPercent != undefined)? item.discPercent: 0));
                }
                if (priceSalesDSP) {
                    arrayItems.push(numberFormat((item.discountAmountUSD != undefined)? item.discountAmountUSD: 0));
                }
            }else{
                if (priceSalesCTP) {
                    arrayItems.push(numberFormat((item.actualCost != undefined)? item.actualCost['USD']: 0));
                }
                if (priceSalesUCP) {
                    arrayItems.push(numberFormat((item.updatedCost != undefined)? item.updatedCost['USD']: 0));
                }
                if (priceSalesRTP) {
                    arrayItems.push(numberFormat((item.price != undefined)? item.price['USD']: 0));
                }
                if (priceSalesNSP) {
                    arrayItems.push(numberFormat((item.netAmount != undefined)? item.netAmount[userCurrency]: 0));
                }
                if (priceSalesNSP) {
                    arrayItems.push(numberFormat((item.netAmount != undefined)? item.netAmount['USD']: 0));
                }
                if (priceSalesMGP) {
                    arrayItems.push(numberFormat((item.margin != undefined)? (item.margin[userCurrency]/item.netAmount[userCurrency])*100: 0));
                }
                if (priceSalesMGP) {
                    arrayItems.push(numberFormat((item.margin != undefined)? item.margin[userCurrency]: 0));
                }
                if (priceSalesDSP) {
                    arrayItems.push(numberFormat((item.discPercent != undefined)? item.discPercent: 0));
                }
                if (priceSalesDSP) {
                    arrayItems.push(numberFormat((item.discountAmountUSD != undefined)? item.discountAmountUSD: 0));
                }
            }

            let jewelsWeight = 0;

            if(item.gemstones != undefined){
                item.gemstones.forEach(function(gemstone) {
                    if(gemstone.carat != undefined){
                      jewelsWeight = jewelsWeight + gemstone.carat;
                    }
                });
            }

            arrayItems.push(
                (item.grossWeight != undefined) ? item.grossWeight : '',
                (item.size != undefined) ? item.size : '',
                jewelsWeight,
                (item.site != undefined) ? item.site : '',
                (item.company != undefined) ? item.company : '',
                (item.warehouse != undefined) ? item.warehouse : '',
            );
            if(fields.allFields){
                arrayItems.push(
                    (item.hierarchy != undefined) ? item.hierarchy.split('\\').pop() : '',
                    (item.type == 'ACC' || item.type == 'OBA' || item.type == 'SPP') ? item.subType : '', // category
                    (item.type == 'JLY' || item.type == 'WAT' || item.type == 'STO') ? item.subType : '', // article
                    (item.collectionName != undefined) ? item.collectionName : '',
                    (item.setReference != undefined) ? item.setReference : '',
                    (item.quantity != undefined) ? item.quantity : '',
                    (item.markupPercentage != undefined) ? item.markupPercentage : '',
                    (item.certificatedNumber != undefined) ? item.certificatedNumber : '',
                    (item.dominantStoneName != undefined) ? item.dominantStoneName : '',
                    (item.brandName != undefined) ? item.brandName : '',
                    (item.postedDate != undefined) ? convertDate(item.postedDate) : '',
                    (item.salesId != undefined) ? item.salesId : '',
                    (item.salesPersonName != undefined) ? item.salesPersonName : '',
                    (item.salesChannelType != undefined) ? item.salesChannelType : '',
                    (item.customer != undefined) ? item.customer : '',
                    (item.customerName != undefined) ? item.customerName : '',
                    (item.invoicedId != undefined) ? item.invoicedId : '',
                    (item.invoiceDate != undefined) ? item.invoiceDate : '',
                    (item.inventSizeId != undefined) ? item.inventSizeId : ''
                );
            }else{
                if(fields.categoryName) arrayItems.push((item.hierarchy != undefined) ? item.hierarchy.split('\\').pop() : '');
                if(fields.category) arrayItems.push((item.type == 'ACC' || item.type == 'OBA' || item.type == 'SPP') ? item.subType : '');
                if(fields.article) arrayItems.push((item.type == 'JLY' || item.type == 'WAT' || item.type == 'STO') ? item.subType : '');
                if(fields.collection) arrayItems.push((item.collectionName != undefined) ? item.collectionName : '');
                if(fields.setReferenceNumber) arrayItems.push((item.setReference != undefined) ? item.setReference : '');
                if(fields.qty) arrayItems.push((item.quantity != null) ? item.quantity : '');
                if(fields.markup) arrayItems.push((item.markupPercentage != undefined) ? item.markupPercentage : '');
                if(fields.certificatedNumber) arrayItems.push('');
                if(fields.dominantStone) arrayItems.push((item.dominantStoneName != undefined) ? item.dominantStoneName : '');
                if(fields.brand) arrayItems.push((item.brandName != undefined) ? item.brandName : '');
                if(fields.postedDate) arrayItems.push((item.postedDate != undefined) ? convertDate(item.postedDate) : '')
                if(fields.salesId) arrayItems.push((item.salesId != undefined) ? item.salesId : '');
                if(fields.salesPersonName) arrayItems.push((item.salesPersonName != undefined) ? item.salesPersonName : '');
                if(fields.salesChannelType) arrayItems.push((item.salesChannelType != undefined) ? item.salesChannelType : '');
                if(fields.customer) arrayItems.push((item.customer != undefined) ? item.customer : '');
                if(fields.customerName) arrayItems.push((item.customerName != undefined) ? item.customerName : '');
                if(fields.invoicedId) arrayItems.push((item.invoicedId != undefined) ? item.invoicedId : '');
                if(fields.invoiceDate) arrayItems.push((item.invoiceDate != undefined) ? item.invoiceDate : '');
                if(fields.inventSizeId) arrayItems.push((item.inventSizeId != undefined) ? item.inventSizeId : '');
            }
            if(item.gemstones != undefined){
                if(item.gemstones.length == 0){
                    newdata.push(arrayItems);
                }else{
                    newdata.push(arrayItems);
                    if(fields.ingredients || fields.allFields){
                        item.gemstones.forEach(function(gemstone) {
                            arrayItems = [];
                            if (fields.showImages)
                                arrayItems.push(''); // images

                            arrayItems.push(
                                itemReference, // Item Reference
                                '', // Item Description
                                (gemstone.stoneTypeId != undefined) ? gemstone.stoneTypeId : '', // sku
                                ''
                            ); // Vendor ref
                            if (userCurrency != 'USD') {
                                if (price == 'All') {
                                    arrayItems.push(numberFormat((gemstone.cost[userCurrency] != undefined)? gemstone.cost[userCurrency]: 0 )); // actual Price
                                }
                                if (price == 'Updated' || price == 'All') {
                                    arrayItems.push(''); // updated Price
                                }
                                if (price == 'Public' || price == 'Updated' || price == 'All') {
                                    arrayItems.push('');// Public Price
                                }

                                if (price == 'All') {
                                    arrayItems.push(numberFormat((gemstone.cost['USD'] != undefined)? gemstone.cost['USD']: 0 )); // actual Price (USD)
                                }
                                if (price == 'Updated' || price == 'All') {
                                    arrayItems.push(''); // updated Price (USD)
                                }
                                if (price == 'Public' || price == 'Updated' || price == 'All') {
                                    arrayItems.push('');// Public Price (USD)
                                }
                            }else{
                                if (price == 'All') {
                                    arrayItems.push(numberFormat((gemstone.cost['USD'] != undefined)? gemstone.cost['USD']: 0 ));// actual Price (USD)
                                }
                                if (price == 'Updated' || price == 'All') {
                                    arrayItems.push(''); // updated Price (USD)
                                }
                                if (price == 'Public' || price == 'Updated' || price == 'All') {
                                    arrayItems.push('');// Public Price (USD)
                                }
                            }
                            arrayItems.push(
                                '', // Gross Weight
                                '', // Ring Size
                                '', // Jewels Weight
                                '', // Site
                                '', // Company
                                ''
                            ); // Warehouse
                            arrayItems.push('Ingredient');
                            if(fields.categoryName || fields.allFields) arrayItems.push(''); // Category Name
                            if(fields.category || fields.allFields) arrayItems.push(''); // Category
                            if(fields.article || fields.allFields) arrayItems.push(''); // article
                            if(fields.collection || fields.allFields) arrayItems.push(''); // Collection
                            if(fields.setReferenceNumber || fields.allFields) arrayItems.push(''); // Set Reference Number
                            if(fields.cut || fields.allFields) arrayItems.push((gemstone.cut != undefined) ? gemstone.cut : ''); // Cut
                            if(fields.color || fields.allFields) arrayItems.push((gemstone.color != undefined) ? gemstone.color : ''); // Color
                            if(fields.clarity || fields.allFields) arrayItems.push((gemstone.clarity != undefined) ? gemstone.clarity : ''); // Clarity
                            if(fields.caratWt || fields.allFields) arrayItems.push((gemstone.carat != undefined) ? gemstone.carat : ''); // Carat Wt
                            if(fields.unit || fields.allFields) arrayItems.push((gemstone.unit != undefined) ? gemstone.unit : ''); // Unit
                            if(fields.qty || fields.allFields) arrayItems.push((gemstone.quantity != undefined) ? gemstone.quantity : ''); // Qty
                            if(fields.origin || fields.allFields) arrayItems.push((gemstone.origin != undefined) ? gemstone.origin : ''); // Origin
                            if(fields.symmetry || fields.allFields) arrayItems.push((gemstone.symmetry != undefined) ? gemstone.symmetry : ''); // symmetry
                            if(fields.flourance || fields.allFields) arrayItems.push((gemstone.fluorescence != undefined) ? gemstone.fluorescence : ''); // Flourance
                            if(fields.batch || fields.allFields) arrayItems.push(''); // Batch lot number
                            if(fields.netWeight || fields.allFields) arrayItems.push(''); // Net Weight
                            if(fields.stoneQty || fields.allFields) arrayItems.push(0); // Stone Qty
                            if(fields.dominantStone || fields.allFields) arrayItems.push(''); // Dominant Stone
                            if(fields.markup || fields.allFields) arrayItems.push(''); // Markup%
                            if(fields.certificatedNumber || fields.allFields) arrayItems.push((gemstone.certificate != undefined) ? gemstone.certificate.number : ''); // Certificate Number
                            if(fields.certificateDate || fields.allFields) arrayItems.push((gemstone.certificate != undefined) ? convertDate(gemstone.certificate.issuedDate) : ''); // Certificate Date
                            if(fields.vendorCode || fields.allFields) arrayItems.push(''); // Vendor Code
                            if(fields.vendorName || fields.allFields) arrayItems.push(''); // Vendor Name
                            if(fields.metalColor || fields.allFields) arrayItems.push(''); // Metal Color
                            if(fields.metalType || fields.allFields) arrayItems.push(''); // Metal
                            if(fields.brand || fields.allFields) arrayItems.push(''); // Brand
                            if(fields.complication || fields.allFields) arrayItems.push(''); // Complication
                            if(fields.strapType || fields.allFields) arrayItems.push(''); // Strap Type
                            if(fields.strapColor || fields.allFields) arrayItems.push(''); // Strap Color
                            if(fields.buckleType || fields.allFields) arrayItems.push(''); // Buckle Type
                            if(fields.dialIndex || fields.allFields) arrayItems.push(''); // Dial Index
                            if(fields.dialColor || fields.allFields) arrayItems.push(''); // Dial Color
                            if(fields.movement || fields.allFields) arrayItems.push(''); // Movement
                            if(fields.serial || fields.allFields) arrayItems.push(''); // Serial #
                            if(fields.limitedEdition || fields.allFields) arrayItems.push((item.limitedEdition != undefined) ? (item.limitedEdition) ? 'Yes' : 'No' : 'No'); // Limited Edition
                            if(fields.limitedEditionNumber || fields.allFields) arrayItems.push(''); // Limited Edition #
                            if(fields.itemCreatedDate || fields.allFields) arrayItems.push(''); // Created Date #
                            newdata.push(arrayItems);
                        });
                    }
                }
            }else{
                newdata.push(arrayItems);
            }
        });

        return resolve(newdata)

    } catch (err) {
        throw err;
    }
});

export { ingredient, setitems };
