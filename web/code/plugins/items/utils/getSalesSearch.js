const GetSearchGemstone = require('../utils/getSearchGemstone');
const GetSearchLotNumber = require('../utils/getSearchLotNaumber');

const internals = {
    filters: []
};
module.exports = (request, fromRecord, sizeRecord, clarity, cb) => {
    let obj = request.payload;
    let page = request.payload.page;
    let sortBy = request.payload.sortBy;
    let sortDirections = request.payload.sortDirections;
    let userCurrency = request.payload.userCurrency;
    let userPermissionPrice = request.payload.userPermissionPrice;
    let keys = Object.keys(obj);
    let fields = request.payload.fields;
    let price = request.payload.price;
    let userName = request.payload.userName;
    let ROOT_URL = request.payload.ROOT_URL;
    let isSetReference = !!request.payload.setReference? true: false;
    let objRange={length:0};
    let filter = '';
    let pageSize = request.payload.pageSize;
    let fromitem = (page-1)*pageSize;
    let keyFromLot = '';
    let valFromLot = 0;
    let valToLot = 0;
    let keyFromCarat = '';
    let valFromCarat = 0;
    let valToCarat = 0;
    let keyFromCost = '';
    let valFromCost = 0;
    let valToCost = 0;
    let keyFromUpdatedCost = '';
    let valFromUpdatedCost = 0;
    let valToUpdatedCost = 0;
    let keyFromPPP = '';
    let valFromPPP = 0;
    let valToPPP = 0;
    let keyFromMarkup = '';
    let valFromMarkup = 0;
    let valToMarkup = 0;
    let valFromGrossW = 0;
    let valToGrossW = 0;
    let valFromProDate = '';
    let valToProDate = '';
    let valDimensionFrom = 0;
    let valDimensionTo = 0;
    let valMetalWeightFrom = 0;
    let valMetalWeightTo = 0;
    let valFromNetSales = 0;
    let valToNetSales = 0;
    let valFromMargin = 0;
    let valToMargin = 0;
    let valFromDiscount = 0;
    let valToDiscount = 0;
    let valFromInvoiceDate = '';
    let valToInvoiceDate = '';
    let valFromSalesPrice = 0;
    let valToSalesPrice = 0;

    internals.filters = [];
    let isViewAsSet = !!keys.find((key) => {return key == 'viewAsSet'});

    if (keys.length != 3 ){
        keys.forEach((key) => {
            filter = '';
            let value = obj[key];
            if(key == 'reference' || key == 'stoneType' || key == 'cut' || key == 'cutGrade' || key == 'clarity' || key == 'polish' || key == 'symmetry'
                || key == 'treatment' || key == 'location' || key == 'buckleType'|| key == 'fluorescence' || key == 'jewelryCategory' || key == 'collection'
                || key == 'brand' || key == 'mustHave' || key == 'ringSize' || key == 'dominantStone' || key == 'metalType' || key == 'metalColour'
                || key == 'gemstones' || key == 'limitedEdition' || key == 'sku' || key == 'origin' || key == 'watchCategory' || key == 'movement'
                || key == 'dialIndex' || key == 'dialColor' || key == 'dialMetal' || key == 'strapType' || key == 'strapColor' || key == 'complication'
                || key == 'color' || key == 'setReference' || key == 'warehouse' || key == 'salesChannel' || key == 'article'
            ){
                value = `${value}`
                value = value.replace(/,/gi, ' ');
            }

            if(key != 'page' && key != 'sortBy' && key != 'sortDirections' && key != 'userCurrency' && key != 'fields' && key != 'price' && key != 'pageSize'
                && key != 'ROOT_URL' && key != 'userName' && key != 'userEmail' && key != 'viewAsSet' && key != 'ItemsSalesOrder' && key != 'SetReferenceSalesOrder'
                && key != 'env' && key != 'viewType' && key != 'userPermissionPrice' && key != 'typeFile' && key != 'customerSearch' && key != 'jlySalesHierarchy' 
                && key != 'watSalesHierarchy' && key != 'stoSalesHierarchy' && key != 'accSalesHierarchy' && key != 'obaSalesHierarchy' && key != 'sppSalesHierarchy'
                && key != 'jewelryProductSalesHierarchy' && key != 'watchProductSalesHierarchy' && key != 'stoneProductSalesHierarchy' 
                && key != 'accessoryProductSalesHierarchy' && key != 'obaProductSalesHierarchy' && key != 'sparePartProductSalesHierarchy'
            ){
                if(key == 'stoneType' || key == 'cut' || key == 'cutGrade' || key == 'clarity' || key == 'certificateAgency' || key == 'polish' || key == 'mustHave'
                    || key == 'symmetry' || key == 'treatment' || key == 'fluorescence' || key == 'jewelryCategory' || key == 'collection' || key == 'brand'
                    || key == 'ringSize' || key == 'dominantStone' || key == 'metalType' || key == 'metalColour' || key == 'origin' || key == 'watchCategory'
                    || key == 'limitedEdition' || key == 'movement' || key == 'dialIndex' || key == 'dialColor' || key == 'dialMetal' || key == 'buckleType'
                    || key == 'strapType' || key == 'strapColor' || key == 'complication' || key == 'warehouse' || key == 'location' || key=='certificatedNumber'
                    || key == 'invoiceNo' || key == 'dominant' || key == 'article' || key == 'accessoryType' || key == 'sparePartType'
                ){
                    if(key == 'metalColour')
                        key = 'metalColor'
                    if(key == 'location')
                        key = 'company'
                    if(key == 'jewelryCategory')
                        key = 'subType'
                    if(key == 'watchCategory')
                        key = 'subType'
                    if(key == 'ringSize')
                        key = 'size'
                    if(key == 'dominantStone')
                        key = 'dominant'
                    if(key == 'stoneType')
                        key = 'subType'
                    if(key == 'invoiceNo')
                        key = 'invoicedId'
                    if(key == 'dominant')
                        key = 'dominantStone'
                    if(key == 'article')
                        key = 'articleGrouping'
                    if(key == 'accessoryType')
                        key = 'subType'
                    if(key == 'sparePartType')
                        key = 'subType'

                    filter =
                    `{
                        "match": {
                            "${key}": {
                                "query": "${value}"
                            }
                        }
                    }`;
                } else if(key == 'lotQuantityFrom' || key == 'lotQuantityTo'){
                    if(key == 'lotQuantityFrom'){
                        valFromLot = value;
                    }
                    if(key == 'lotQuantityTo'){
                        valToLot = value;
                    }
                    let objLength = objRange.length +1;
                    objRange = {...objRange,'quantity':{'from':valFromLot,'to':valToLot},'length':objLength};
                } else if(key == 'totalCaratWeightFrom' || key == 'totalCaratWeightTo'){
                    keyFromCarat = 'totalCaratWeight';
                    if(key == 'totalCaratWeightFrom'){
                        valFromCarat = value;
                    }
                    if(key == 'totalCaratWeightTo'){
                        valToCarat = value;
                    }
                    let objLength = objRange.length +1;
                    objRange = {...objRange,'carat':{'from':valFromCarat,'to':valToCarat},'length':objLength};
                } else if(key == 'totalCostFrom' || key == 'totalCostTo'){
                    keyFromCost = 'costUSD';
                    if(key == 'totalCostFrom'){
                        valFromCost = value;
                    }
                    if(key == 'totalCostTo'){
                        valToCost = value;
                    }
                    if (!isViewAsSet) {
                        let objLength = objRange.length +1;
                        objRange = {...objRange,'actualCost.USD':{'from':valFromCost,'to':valToCost},'length':objLength};    
                    }
                } else if(key == 'totalUpdatedCostFrom' || key == 'totalUpdatedCostTo'){
                    keyFromUpdatedCost = 'updatedCostUSD';
                    if(key == 'totalUpdatedCostFrom'){
                        valFromUpdatedCost = value;
                    }
                    if(key == 'totalUpdatedCostTo'){
                        valToUpdatedCost = value;
                    }
                    if (!isViewAsSet) {
                        let objLength = objRange.length +1;
                        objRange = {...objRange,'updatedCost.USD':{'from':valFromUpdatedCost,'to':valToUpdatedCost},'length':objLength};
                    }
                } else if(key == 'publicPriceFrom' || key == 'publicPriceTo'){
                    keyFromPPP = 'priceUSD';
                    if(key == 'publicPriceFrom'){
                        valFromPPP = value;
                    }
                    if(key == 'publicPriceTo'){
                        valToPPP = value;
                    }
                    if (!isViewAsSet) {
                        let objLength = objRange.length +1;
                        objRange = {...objRange,'price.USD':{'from':valFromPPP,'to':valToPPP},'length':objLength};
                    }
                } else if(key == 'retailPriceFrom' || key == 'retailPriceTo'){
                    if(key == 'retailPriceFrom'){
                        valFromSalesPrice = value;
                    }
                    if(key == 'retailPriceTo'){
                        valToSalesPrice = value;
                    }
                    if (!isViewAsSet) {
                        let objLength = objRange.length +1;
                        objRange = {...objRange,'price.USD':{'from':valFromSalesPrice,'to':valToSalesPrice},'length':objLength};
                    }
                }  else if(key == 'netSalesFrom' || key == 'netSalesTo'){
                    if(key == 'netSalesFrom'){
                        valFromNetSales = value;
                    }
                    if(key == 'netSalesTo'){
                        valToNetSales = value;
                    }
                    if (!isViewAsSet) {
                        let objLength = objRange.length +1;
                        objRange = {...objRange,'netAmount.USD':{'from':valFromNetSales,'to':valToNetSales},'length':objLength};
                    }
                } else if(key == 'marginFrom' || key == 'marginTo'){
                    if(key == 'marginFrom'){
                        valFromMargin = value;
                    }
                    if(key == 'marginTo'){
                        valToMargin = value;
                    }
                    if (!isViewAsSet) {
                        let objLength = objRange.length +1;
                        objRange = {...objRange,'marginPercent':{'from':valFromMargin,'to':valToMargin},'length':objLength};
                    }
                } else if(key == 'discountFrom' || key == 'discountTo'){
                    if(key == 'discountFrom'){
                        valFromDiscount = value;
                    }
                    if(key == 'discountTo'){
                        valToDiscount = value;
                    }
                    if (!isViewAsSet) {
                        let objLength = objRange.length +1;
                        objRange = {...objRange,'discountPercent':{'from':valFromDiscount,'to':valToDiscount},'length':objLength};
                    }
                } else if(key == 'markupFrom' || key == 'markupTo'){
                    keyFromMarkup = 'markup';
                    if(key == 'markupFrom'){
                        valFromMarkup = value;
                    }
                    if(key == 'markupTo'){
                        valToMarkup= value;
                    }
                    let objLength = objRange.length +1;
                    objRange = {...objRange,'markup':{'from':valFromMarkup,'to':valToMarkup},'length':objLength};
                } else if(key == 'grossWeightFrom' || key == 'grossWeightTo'){
                    if(key == 'grossWeightFrom'){
                        valFromGrossW = value;
                    }
                    if(key == 'grossWeightTo'){
                        valToGrossW= value;
                    }
                    let objLength = objRange.length +1;
                    objRange = {...objRange,'grossWeight':{'from':valFromGrossW,'to':valToGrossW},'length':objLength};
                } else if(key == 'proDateFrom' || key == 'proDateTo'){
                    if(key == 'proDateFrom'){
                        // MM-dd-YYYY to YYYY-MM-dd
                        let d = value.split('-');
                        valFromProDate = `${d[2]}-${d[0]}-${d[1]}`;
                    }
                    if(key == 'proDateTo'){
                        // MM-dd-YYYY to YYYY-MM-dd
                        let d = value.split('-');
                        valToProDate= `${d[2]}-${d[0]}-${d[1]}`;
                    }
                    let objLength = objRange.length +1;
                    objRange = {...objRange,'productionDate':{'from':valFromProDate,'to':valToProDate},'length':objLength};
                } else if(key == 'invoiceDateFrom' || key == 'invoiceDateTo'){
                    if(key == 'invoiceDateFrom'){
                        // MM-dd-YYYY to YYYY-MM-dd
                        let d = value.split('-');
                        valFromInvoiceDate = `${d[2]}-${d[0]}-${d[1]}`;
                    }
                    if(key == 'invoiceDateTo'){
                        // MM-dd-YYYY to YYYY-MM-dd
                        let d = value.split('-');
                        valToInvoiceDate= `${d[2]}-${d[0]}-${d[1]}`;
                    }
                    let objLength = objRange.length +1;
                    objRange = {...objRange,'invoiceDate':{'from':valFromInvoiceDate,'to':valToInvoiceDate},'length':objLength};
                } else if(key == 'caseDimensionFrom' || key == 'caseDimensionTo'){
                    if(key == 'caseDimensionFrom'){
                        valDimensionFrom = value;
                    }
                    if(key == 'caseDimensionTo'){
                        valDimensionTo= value;
                    }
                    let objLength = objRange.length +1;
                    objRange = {...objRange,'caseDimension':{'from':valDimensionFrom,'to':valDimensionTo},'length':objLength};
                } else if(key == 'preciousMetalWeightFrom' || key == 'preciousMetalWeightTo'){
                    if(key == 'preciousMetalWeightFrom'){
                        valMetalWeightFrom = value;
                    }
                    if(key == 'preciousMetalWeightTo'){
                        valMetalWeightTo= value;
                    }
                    let objLength = objRange.length +1;
                    objRange = {...objRange,'preciousMetalWeight':{'from':valMetalWeightFrom,'to':valMetalWeightTo},'length':objLength};
                } else if(key == 'description'){
                    let filterSplit = [];
                    let vals = value.replace(',',' ');
                    let mapField =
                    `{
                        "match": {
                            "description": {
                                "query": "${vals.trim()}",
                                "type": "phrase"
                            }
                        }
                    }`;
                    filter =
                    `{
                        "bool": {
                            "must": [
                                ${mapField}
                            ]
                        }
                    }`;
                } else if(key == 'setName'){
                    let filterSplit = [];
                    let vals = value.replace(',',' ');
                    let mapField =
                    `{
                        "match": {
                            "setName": {
                                "query": "${vals.trim()}",
                                "type": "phrase"
                            }
                        }
                    }`;
                    filter =
                    `{
                        "bool": {
                            "must": [
                                ${mapField}
                            ]
                        }
                    }`;
                } else if(key == 'notUseHierarchy'){
                    let filterSplit = [];
                    let vals = value.split('|');
                    vals.forEach((val)=>{
                        let mapField =
                        `{
                            "match": {
                                "hierarchy": {
                                    "query": "${val.trim()}",
                                    "type": "phrase"
                                }
                            }
                        }`;
                        filterSplit.push(JSON.parse(mapField));
                    });
                    filter =
                    `{
                        "bool": {
                            "must_not": [
                                ${JSON.stringify(filterSplit)}
                            ]
                        }
                    }`;
                } else if(key == 'hierarchy'){
                    let filterSplit = [];
                    let vals = value.split('|');
                    vals.forEach((val)=>{
                        let mapField =
                        `{
                            "match": {
                                "hierarchy": {
                                    "query": "${val.trim()}",
                                    "type": "phrase"
                                }
                            }
                        }`;
                        filterSplit.push(JSON.parse(mapField));
                    });
                    filter =
                    `{
                        "bool": {
                            "should": [
                                ${JSON.stringify(filterSplit)}
                            ]
                        }
                    }`;
                } else if(key == 'gemstones'){
                    filter = GetSearchGemstone(key, obj, userCurrency, clarity);
                } else if(key == 'lotNumbers'){
                    filter = GetSearchLotNumber(key, obj, userCurrency);
                } else if (key == 'customer') {
                    let filterSplit = [];
                    let hasSpace = value.indexOf(' ') != -1 ? true : false;
                    if (hasSpace) {
                        let mapField =
                        `{
                            "match": {
                                "customerNameFullTextSearch": {
                                    "query": "${value.trim()}"
                                }
                            }
                        }`;
                        filterSplit.push(JSON.parse(mapField));
                    }else {
                        let mapField =
                        `{
                            "match": {
                                "customerNameSplitTextSearch": {
                                    "query": "${value.trim()}"
                                }
                            }
                        }`;
                        filterSplit.push(JSON.parse(mapField));
                        mapField =
                        `{
                            "match": {
                                "customerEmail": {
                                    "query": "${value.trim()}"
                                }
                            }
                        }`;
                        filterSplit.push(JSON.parse(mapField));
                    }

                    let mapField = '';
                    mapField =
                    `{
                        "match": {
                            "customer": {
                                "query": "${value.trim()}"
                            }
                        }
                    }`;
                    filterSplit.push(JSON.parse(mapField));
                    mapField = '';
                    mapField =
                    `{
                        "match": {
                            "customerPhone": {
                                "query": "${value.trim()}"
                            }
                        }
                    }`;
                    filterSplit.push(JSON.parse(mapField));
                    filter =
                    `{
                        "bool": {
                            "should": [
                                ${JSON.stringify(filterSplit)}
                            ]
                        }
                    }`;
                } else {
                    filter =
                    `{
                        "match": {
                            "${key}": {
                                "query": "${value}"
                            }
                        }
                    }`;
                }
                if(filter != ''){
                    internals.filters.push(JSON.parse(filter));
                     filter = '';
                }
            }
        });

        if(objRange.length != 0){
            let keysObjRange = Object.keys(objRange);
            keysObjRange.forEach((key) => {
                if(key != 'length'){
                    if(objRange[key].to != 0){
                        filter =
                        `{
                            "range": {
                                "${key}": {
                                    "gte": "${objRange[key].from}",
                                    "lte": "${objRange[key].to}"
                                }
                            }
                        }`;
                    }else{
                        filter =
                        `{
                            "range": {
                                "${key}": {
                                    "gte": "${objRange[key].from}"
                                }
                            }
                        }`;
                    }
                    internals.filters.push(JSON.parse(filter));
                    filter = '';
                }
            });
        }

        let missing = '';
        let sortEs = '';

        switch (sortDirections) {
            case 'asc':
                missing = '"missing" : "_first"';
                missing = `{"${sortBy}" : {${missing}}},`;
                break;
            default:
                break;
        }

        if (sortBy == 'setReference') {
            sortEs = `${missing}
                      {"${sortBy}" : "${sortDirections}"},
                      {"priority" : "${sortDirections}"}`;
        }else{
            sortEs = `${missing}
                      {"${sortBy}" : "${sortDirections}"}`;
        }

        if (!!keys.find((key) => {return key == 'warehouse'})) {
            let value = obj['warehouse'];
            //    have MME.CONS
            if (value.indexOf('MME.CONS') != -1) {
                //   intersection first array
                internals.query = JSON.parse(
                    `{
                        "timeout": "5s",
                        "from": ${fromRecord},
                        "size": ${sizeRecord},
                        "sort" : [
                            ${sortEs}
                        ],
                        "query": {
                            "constant_score": {
                                "query": {
                                    "bool": {
                                        "must": ${JSON.stringify(internals.filters)}
                                    }
                                }
                            }
                        }
                    }`
                );
            }else{
                //    not have MME.CONS
                internals.query = JSON.parse(
                    `{
                        "timeout": "5s",
                        "from": ${fromRecord},
                        "size": ${sizeRecord},
                        "sort" : [
                            ${sortEs}
                        ],
                        "query": {
                            "constant_score": {
                                "query": {
                                    "bool": {
                                        "must": ${JSON.stringify(internals.filters)},
                                        "must_not":[
                                            {
                                                "match": {
                                                    "warehouse": {
                                                        "query": "MME.CONS"
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }`
                );
            }
        }else{
            internals.query = JSON.parse(
                `{
                    "timeout": "5s",
                    "from": ${fromRecord},
                    "size": ${sizeRecord},
                    "sort" : [
                        ${sortEs}
                    ],
                    "query": {
                        "constant_score": {
                            "query": {
                                "bool": {
                                    "must": ${JSON.stringify(internals.filters)},
                                    "must_not":[
                                        {
                                            "match": {
                                                "warehouse": {
                                                    "query": "MME.CONS"
                                                }
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }`
            );
        }
    } else {
        internals.query = JSON.parse(
            `{
                "timeout": "5s",
                "from": ${fromRecord},
                "size": ${sizeRecord},
                "sort" : [
                    ${sortEs}
                ],
                "query": {
                    "match_all": {}
                }
            }`
        );
    }
    return internals.query;
}
