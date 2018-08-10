import numberFormat from './convertNumberformat';
import convertDate from './convertDate';
import moment from 'moment';

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

            if (price == 'All') {
                arrayItems.push(numberFormat((item.totalActualCost != undefined)? item.totalActualCost['USD']: 0));
            }
            if (price == 'Updated' || price == 'All') {
                arrayItems.push(numberFormat((item.totalUpdatedCost != undefined)? item.totalUpdatedCost['USD']: 0));
            }
            if (price == 'Public' || price == 'Updated' || price == 'All') {
                arrayItems.push(numberFormat((item.totalPrice != undefined)? item.totalPrice['USD']: 0));
            }

            if(fields.allFieldsViewAsSet){
                if (price == 'Updated' || price == 'All') {
                    arrayItems.push(
                        (item.markup != undefined) ? item.markup : ''
                    );
                }
                arrayItems.push(
                    (item.companyName != undefined) ? item.companyName : '',
                    (item.warehouseName != undefined) ? item.warehouseName : '',
                    (item.createdDate != undefined) ? convertDate(item.createdDate) : ''
                );
            }else{
                if(fields.totalActualCost) arrayItems.push(numberFormat((item.totalActualCost != undefined)? item.totalActualCost['USD']: 0));
                if(fields.totalUpdatedCost) arrayItems.push(numberFormat((item.totalUpdatedCost != undefined)? item.totalUpdatedCost['USD']: 0));
                if(fields.totalPrice) arrayItems.push(numberFormat((item.totalPrice != undefined)? item.totalPrice['USD']: 0));
                if(fields.markup) arrayItems.push((item.markup != undefined) ? item.markup : '');
                if(fields.companyName) arrayItems.push((item.companyName != undefined) ? item.companyName : '');
                if(fields.warehouseName) arrayItems.push((item.warehouseName != undefined) ? item.warehouseName : '');
                if(fields.createdDate) arrayItems.push((item.createdDate != undefined) ? convertDate(item.createdDate) : '');
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

        data.forEach(function(item){
            items = items+1;
            let arrayItems = [];
            let itemReference = item.reference;

            if (fields.showImages){
                arrayItems.push((item.gallery.length) != 0 ? item.gallery[0].thumbnail : '');
            }

            arrayItems.push(item.reference,item.description,item.sku,item.venderReference);
            if (userCurrency != 'USD') {
                if (price == 'All') {
                    arrayItems.push(numberFormat((item.actualCost != undefined)? item.actualCost[userCurrency]: 0 ));
                }
                if (price == 'Updated' || price == 'All') {
                    arrayItems.push(numberFormat((item.updatedCost != undefined)? item.updatedCost[userCurrency]: 0 ));
                }
                if (price == 'Public' || price == 'Updated' || price == 'All') {
                    arrayItems.push(numberFormat((item.price != undefined)? item.price[userCurrency]: 0 ));
                }

                if (price == 'All') {
                    arrayItems.push(numberFormat((item.actualCost != undefined)? item.actualCost['USD']: 0));
                }
                if (price == 'Updated' || price == 'All') {
                    arrayItems.push(numberFormat((item.updatedCost != undefined)? item.updatedCost['USD']: 0));
                }
                if (price == 'Public' || price == 'Updated' || price == 'All') {
                    arrayItems.push(numberFormat((item.price != undefined)? item.price['USD']: 0));
                }
            }else{
                if (price == 'All') {
                    arrayItems.push(numberFormat((item.actualCost != undefined)? item.actualCost['USD']: 0));
                }
                if (price == 'Updated' || price == 'All') {
                    arrayItems.push(numberFormat((item.updatedCost != undefined)? item.updatedCost['USD']: 0));
                }
                if (price == 'Public' || price == 'Updated' || price == 'All') {
                    arrayItems.push(numberFormat((item.price != undefined)? item.price['USD']: 0));
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
                    'Main',
                    (item.hierarchy != undefined) ? item.hierarchy.split('\\').pop() : '',
                    (item.type == 'ACC' || item.type == 'OBA' || item.type == 'SPP') ? item.subType : '', // category
                    (item.type == 'JLY' || item.type == 'WAT' || item.type == 'STO') ? item.subType : '', // article
                    (item.collectionName != undefined) ? item.collectionName : '',
                    (item.setReference != undefined) ? item.setReference : '',
                    (item.cut != undefined) ? item.cut : '',
                    (item.color != undefined) ? item.color : '',
                    (item.clarity != undefined) ? item.clarity : '',
                    (item.carat != undefined) ? item.carat : 0,
                    (item.unit != undefined) ? item.unit : '',
                    (item.quantity != undefined) ? item.quantity : '',
                    (item.origin != undefined) ? item.origin : '',
                    (item.symmetry != null) ? item.symmetry : '',
                    (item.fluorescence != undefined) ? item.fluorescence : '',
                    (item.lotNumber != undefined) ? item.lotNumber : '',
                    (item.netWeight != undefined) ? item.netWeight : ''
                );
                let stoneQty = 0;
                if(item.gemstones != undefined){
                    item.gemstones.forEach(function(gemstone) {
                        if(gemstone.quantity != undefined){
                            stoneQty = stoneQty + gemstone.quantity;
                        }
                    });
                }
                arrayItems.push(
                    stoneQty,
                    (item.dominantStoneName != undefined) ? item.dominantStoneName : ''
                )
                if (price == 'Updated' || price == 'All') {
                    arrayItems.push(
                        (item.markup != undefined) ? item.markup : ''
                    );
                }
                arrayItems.push(
                    '',
                    '',
                    (item.vendor != undefined) ? item.vendor : '',
                    (item.vendorName != undefined) ? item.vendorName : '',
                    (item.metalColorName != undefined) ? item.metalColorName : '',
                    (item.metalTypeName != undefined) ? item.metalTypeName : '',
                    (item.brandName != undefined) ? item.brandName : '',
                    (item.complicationName != undefined) ? item.complicationName : '',
                    (item.strapTypeName != undefined) ? item.strapTypeName : '',
                    (item.strapColorName != undefined) ? item.strapColorName : '',
                    (item.buckleTypeName != undefined) ? item.buckleTypeName : '',
                    (item.dialIndexName != undefined) ? item.dialIndexName : '',
                    (item.dialColorName != undefined) ? item.dialColorName : '',
                    (item.movementName != undefined) ? item.movementName : '',
                    (item.serialNumber != undefined) ? item.serialNumber : '',
                    (item.limitedEdition != undefined) ? (item.limitedEdition) ? 'Yes' : 'No' : 'No',
                    (item.limitedEditionNumber != undefined) ? item.limitedEditionNumber : '',
                    (item.itemCreatedDate != undefined) ? convertDate(item.itemCreatedDate) : ''
                );
            }else{
                if(fields.ingredients) arrayItems.push('Main');
                if(fields.categoryName) arrayItems.push((item.hierarchy != undefined) ? item.hierarchy.split('\\').pop() : '');
                if(fields.category) arrayItems.push((item.type == 'ACC' || item.type == 'OBA' || item.type == 'SPP') ? item.subType : '');
                if(fields.article) arrayItems.push((item.type == 'JLY' || item.type == 'WAT' || item.type == 'STO') ? item.subType : '');
                if(fields.collection) arrayItems.push((item.collectionName != undefined) ? item.collectionName : '');
                if(fields.setReferenceNumber) arrayItems.push((item.setReference != undefined) ? item.setReference : '');
                if(fields.cut) arrayItems.push((item.cut != undefined) ? item.cut : '');
                if(fields.color) arrayItems.push((item.color != undefined) ? item.color : '');
                if(fields.clarity) arrayItems.push((item.clarity != undefined) ? item.clarity : '');
                if(fields.caratWt) arrayItems.push((item.carat != undefined) ? item.carat : 0);
                if(fields.unit) arrayItems.push((item.unit != undefined) ? item.unit : '');
                if(fields.qty) arrayItems.push((item.quantity != null) ? item.quantity : '');
                if(fields.origin) arrayItems.push((item.origin != undefined) ? item.origin : '');
                if(fields.symmetry) arrayItems.push((item.symmetry != undefined) ? item.symmetry : '');
                if(fields.flourance) arrayItems.push((item.fluorescence != undefined) ? item.fluorescence : '');
                if(fields.batch) arrayItems.push((item.lotNumber != undefined) ? item.lotNumber : '');
                if(fields.netWeight) arrayItems.push((item.netWeight != undefined) ? item.netWeight : '');
                let stoneQty = 0;
                if(item.gemstones != undefined){
                    item.gemstones.forEach(function(gemstone) {
                        if(gemstone.quantity != undefined){
                            stoneQty = stoneQty + gemstone.quantity;
                        }
                    });
                }
                if(fields.stoneQty) arrayItems.push((stoneQty != 0) ? stoneQty : 0);
                if(fields.dominantStone) arrayItems.push((item.dominantStoneName != undefined) ? item.dominantStoneName : '');
                if(fields.markup) arrayItems.push((item.markup != undefined) ? item.markup : '');
                if(fields.certificatedNumber) arrayItems.push('');
                if(fields.certificateDate) arrayItems.push('');
                if(fields.vendorCode) arrayItems.push((item.vendor != undefined) ? item.vendor : '');
                if(fields.vendorName) arrayItems.push((item.vendorName != undefined) ? item.vendorName : '');
                if(fields.metalColor) arrayItems.push((item.metalColorName != undefined) ? item.metalColorName : '');
                if(fields.metalType) arrayItems.push((item.metalTypeName != undefined) ? item.metalTypeName : '');
                if(fields.brand) arrayItems.push((item.brandName != undefined) ? item.brandName : '');
                if(fields.complication) arrayItems.push((item.complicationName != undefined) ? item.complicationName : '');
                if(fields.strapType) arrayItems.push((item.strapTypeName != undefined) ? item.strapTypeName : '');
                if(fields.strapColor) arrayItems.push((item.strapColorName != undefined) ? item.strapColorName : '');
                if(fields.buckleType) arrayItems.push((item.buckleTypeName != undefined) ? item.buckleTypeName : '');
                if(fields.dialIndex) arrayItems.push((item.dialIndexName != undefined) ? item.dialIndexName : '');
                if(fields.dialColor) arrayItems.push((item.dialColorName != undefined) ? item.dialColorName : '');
                if(fields.movement) arrayItems.push((item.movementName != undefined) ? item.movementName : '');
                if(fields.serial) arrayItems.push((item.serialNumber != undefined) ? item.serialNumber : '');
                if(fields.limitedEdition) arrayItems.push((item.limitedEdition != undefined) ? (item.limitedEdition) ? 'Yes' : 'No' : 'No');
                if(fields.limitedEditionNumber) arrayItems.push((item.limitedEditionNumber != undefined) ? item.limitedEditionNumber : '');
                if(fields.itemCreatedDate) arrayItems.push((item.itemCreatedDate != undefined) ? convertDate(item.itemCreatedDate) : '');
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
                                    arrayItems.push(numberFormat((gemstone.cost[userCurrency] != undefined)? gemstone.cost[userCurrency]: 0 )); // Cost Price
                                }
                                if (price == 'Updated' || price == 'All') {
                                    arrayItems.push(''); // updated Price
                                }
                                if (price == 'Public' || price == 'Updated' || price == 'All') {
                                    arrayItems.push('');// Price
                                }

                                if (price == 'All') {
                                    arrayItems.push(numberFormat((gemstone.cost['USD'] != undefined)? gemstone.cost['USD']: 0 )); // Cost Price (USD)
                                }
                                if (price == 'Updated' || price == 'All') {
                                    arrayItems.push(''); // updated Price (USD)
                                }
                                if (price == 'Public' || price == 'Updated' || price == 'All') {
                                    arrayItems.push('');// Price (USD)
                                }
                            }else{
                                if (price == 'All') {
                                    arrayItems.push(numberFormat((gemstone.cost['USD'] != undefined)? gemstone.cost['USD']: 0 ));// Cost Price (USD)
                                }
                                if (price == 'Updated' || price == 'All') {
                                    arrayItems.push(''); // updated Price (USD)
                                }
                                if (price == 'Public' || price == 'Updated' || price == 'All') {
                                    arrayItems.push('');// Price (USD)
                                }
                            }
                            arrayItems.push(
                                '', // Item Weight(Grams)
                                '', // Ring Size
                                '', // Jewels Weight
                                '', // Site
                                '', // Company
                                ''
                            ); // Location
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
                            if(fields.netWeight || fields.allFields) arrayItems.push(''); // Gold weight (Grams)
                            if(fields.stoneQty || fields.allFields) arrayItems.push(0); // Stone Qty
                            if(fields.dominantStone || fields.allFields) arrayItems.push(''); // Dominant Stone
                            if(fields.markup || fields.allFields){
                                if (price == 'Updated' || price == 'All') {
                                    arrayItems.push(''); // Markup%
                                }
                            }
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
