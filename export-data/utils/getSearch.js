const GetSearchGemstone = require('./getSearchGemstone');

const internals = {
    filters: []
};
module.exports = (obj, fromRecord, sizeRecord, cb) => {
    let page = obj.page;
    let sortBy = obj.sortBy;
    let sortDirections = obj.sortDirections;
    let userCurrency = obj.userCurrency;
    let keys = Object.keys(obj);
    let fields = obj.fields;
    let price = obj.price;
    let userName = obj.userName;
    let ROOT_URL = obj.ROOT_URL;

    let objRange={length:0};
    let filter = '';
    let pageSize = obj.pageSize;
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

    internals.filters = [];

    if (keys.length != 3 ){
        keys.forEach((key) => {
            filter = '';
            // console.log('keys-->',key);
            let value = obj[key];
            if(key == 'reference' || key == 'stoneType' || key == 'cut' || key == 'cutGrade' || key == 'clarity' || key == 'polish' || key == 'symmetry'
                || key == 'treatment' || key == 'location' || key == 'buckleType' || key == 'fluorescence' || key == 'jewelryCategory' || key == 'collection'
                || key == 'brand' || key == 'mustHave' || key == 'ringSize' || key == 'dominantStone' || key == 'metalType' || key == 'metalColour'
                || key == 'gemstones' || key == 'limitedEdition' || key == 'sku' || key == 'origin' || key == 'watchCategory' || key == 'movement'
                || key == 'dialIndex' || key == 'dialColor' || key == 'dialMetal' || key == 'strapType' || key == 'strapColor' || key == 'complication' || key == 'warehouse'
            ){
                value = `${value}`
                value = value.replace(/,/gi, ' ');
            }
            if(key != 'page' && key != 'sortBy' && key != 'sortDirections' && key != 'userCurrency' && key != 'fields' && key != 'price' && key != 'pageSize'
                && key != 'ROOT_URL' && key != 'userName' && key != 'userEmail' && key != 'typeFile' ){

                if(key == 'stoneType' || key == 'cut' || key == 'cutGrade' || key == 'clarity' || key == 'certificateAgency' || key == 'polish' || key == 'symmetry'
                    || key == 'treatment' || key == 'fluorescence' || key == 'jewelryCategory' || key == 'collection' || key == 'brand'|| key == 'mustHave'
                    || key == 'ringSize' || key == 'dominantStone' || key == 'metalType' || key == 'metalColour' || key == 'origin' || key == 'watchCategory'
                    || key == 'limitedEdition' || key == 'movement' || key == 'dialIndex' || key == 'dialColor' || key == 'dialMetal' || key == 'buckleType'
                    || key == 'strapType' || key == 'strapColor' || key == 'complication' || key == 'warehouse' || key == 'location' || key=='certificatedNumber'
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
                    filter =
                    `{
                        "match": {
                            "${key}": {
                                "query": "${value}"
                            }
                        }
                    }`;
                }else if(key == 'lotQuantityFrom' || key == 'lotQuantityTo'){
                    if(key == 'lotQuantityFrom'){
                        valFromLot = value;
                    }
                    if(key == 'lotQuantityTo'){
                        valToLot = value;
                    }
                    let objLength = objRange.length +1;
                    objRange = {...objRange,'quantity':{'from':valFromLot,'to':valToLot},'length':objLength};
                }else if(key == 'totalCaratWeightFrom' || key == 'totalCaratWeightTo'){
                    keyFromCarat = 'totalCaratWeight';
                    if(key == 'totalCaratWeightFrom'){
                        valFromCarat = value;
                    }
                    if(key == 'totalCaratWeightTo'){
                        valToCarat = value;
                    }
                    let objLength = objRange.length +1;
                    objRange = {...objRange,'carat':{'from':valFromCarat,'to':valToCarat},'length':objLength};
                }else if(key == 'totalCostFrom' || key == 'totalCostTo'){
                    keyFromCost = 'costUSD';
                    if(key == 'totalCostFrom'){
                        valFromCost = value;
                    }
                    if(key == 'totalCostTo'){
                        valToCost = value;
                    }
                    let objLength = objRange.length +1;
                    switch(userCurrency){
                        case 'AED':
                            objRange = {...objRange,'actualCost.AED':{'from':valFromCost,'to':valToCost},'length':objLength};
                            break;
                        case 'CHF':
                            objRange = {...objRange,'actualCost.CHF':{'from':valFromCost,'to':valToCost},'length':objLength};
                            break;
                        case 'EUR':
                            objRange = {...objRange,'actualCost.EUR':{'from':valFromCost,'to':valToCost},'length':objLength};
                            break;
                        case 'JOD':
                            objRange = {...objRange,'actualCost.JOD':{'from':valFromCost,'to':valToCost},'length':objLength};
                            break;
                        case 'KWD':
                            objRange = {...objRange,'actualCost.KWD':{'from':valFromCost,'to':valToCost},'length':objLength};
                            break;
                        case 'LBP':
                            objRange = {...objRange,'actualCost.LBP':{'from':valFromCost,'to':valToCost},'length':objLength};
                            break;
                        case 'OMR':
                            objRange = {...objRange,'actualCost.OMR':{'from':valFromCost,'to':valToCost},'length':objLength};
                            break;
                        case 'QAR':
                            objRange = {...objRange,'actualCost.QAR':{'from':valFromCost,'to':valToCost},'length':objLength};
                            break;
                        case 'SAR':
                            objRange = {...objRange,'actualCost.SAR':{'from':valFromCost,'to':valToCost},'length':objLength};
                            break;
                        default:
                            objRange = {...objRange,'actualCost.USD':{'from':valFromCost,'to':valToCost},'length':objLength};
                            break;
                    }
                }else if(key == 'totalUpdatedCostFrom' || key == 'totalUpdatedCostTo'){
                    keyFromUpdatedCost = 'updatedCostUSD';
                    if(key == 'totalUpdatedCostFrom'){
                        valFromUpdatedCost = value;
                    }
                    if(key == 'totalUpdatedCostTo'){
                        valToUpdatedCost = value;
                    }
                    let objLength = objRange.length +1;
                    switch(userCurrency){
                        case 'AED':
                            objRange = {...objRange,'updatedCost.AED':{'from':valFromUpdatedCost,'to':valToUpdatedCost},'length':objLength};
                            break;
                        case 'CHF':
                            objRange = {...objRange,'updatedCost.CHF':{'from':valFromUpdatedCost,'to':valToUpdatedCost},'length':objLength};
                            break;
                        case 'EUR':
                            objRange = {...objRange,'updatedCost.EUR':{'from':valFromUpdatedCost,'to':valToUpdatedCost},'length':objLength};
                            break;
                        case 'JOD':
                            objRange = {...objRange,'updatedCost.JOD':{'from':valFromUpdatedCost,'to':valToUpdatedCost},'length':objLength};
                            break;
                        case 'KWD':
                            objRange = {...objRange,'updatedCost.KWD':{'from':valFromUpdatedCost,'to':valToUpdatedCost},'length':objLength};
                            break;
                        case 'LBP':
                            objRange = {...objRange,'updatedCost.LBP':{'from':valFromUpdatedCost,'to':valToUpdatedCost},'length':objLength};
                            break;
                        case 'OMR':
                            objRange = {...objRange,'updatedCost.OMR':{'from':valFromUpdatedCost,'to':valToUpdatedCost},'length':objLength};
                            break;
                        case 'QAR':
                            objRange = {...objRange,'updatedCost.QAR':{'from':valFromUpdatedCost,'to':valToUpdatedCost},'length':objLength};
                            break;
                        case 'SAR':
                            objRange = {...objRange,'updatedCost.SAR':{'from':valFromUpdatedCost,'to':valToUpdatedCost},'length':objLength};
                            break;
                        default:
                            objRange = {...objRange,'updatedCost.USD':{'from':valFromUpdatedCost,'to':valToUpdatedCost},'length':objLength};
                            break;
                    }
                }else if(key == 'publicPriceFrom' || key == 'publicPriceTo'){
                    keyFromPPP = 'priceUSD';
                    if(key == 'publicPriceFrom'){
                        valFromPPP = value;
                    }
                    if(key == 'publicPriceTo'){
                        valToPPP = value;
                    }
                    let objLength = objRange.length +1;
                    switch(userCurrency){
                        case 'AED':
                            objRange = {...objRange,'price.AED':{'from':valFromPPP,'to':valToPPP},'length':objLength};
                            break;
                        case 'CHF':
                            objRange = {...objRange,'price.CHF':{'from':valFromPPP,'to':valToPPP},'length':objLength};
                            break;
                        case 'EUR':
                            objRange = {...objRange,'price.EUR':{'from':valFromPPP,'to':valToPPP},'length':objLength};
                            break;
                        case 'JOD':
                            objRange = {...objRange,'price.JOD':{'from':valFromPPP,'to':valToPPP},'length':objLength};
                            break;
                        case 'KWD':
                            objRange = {...objRange,'price.KWD':{'from':valFromPPP,'to':valToPPP},'length':objLength};
                            break;
                        case 'LBP':
                            objRange = {...objRange,'price.LBP':{'from':valFromPPP,'to':valToPPP},'length':objLength};
                            break;
                        case 'OMR':
                            objRange = {...objRange,'price.OMR':{'from':valFromPPP,'to':valToPPP},'length':objLength};
                            break;
                        case 'QAR':
                            objRange = {...objRange,'price.QAR':{'from':valFromPPP,'to':valToPPP},'length':objLength};
                            break;
                        case 'SAR':
                            objRange = {...objRange,'price.SAR':{'from':valFromPPP,'to':valToPPP},'length':objLength};
                            break;
                        default:
                            objRange = {...objRange,'price.USD':{'from':valFromPPP,'to':valToPPP},'length':objLength};
                            break;
                    }
                }else if(key == 'markupFrom' || key == 'markupTo'){
                    keyFromMarkup = 'markup';
                    if(key == 'markupFrom'){
                        valFromMarkup = value;
                    }
                    if(key == 'markupTo'){
                        valToMarkup= value;
                    }
                    let objLength = objRange.length +1;
                    objRange = {...objRange,'markup':{'from':valFromMarkup,'to':valToMarkup},'length':objLength};
                }else if(key == 'grossWeightFrom' || key == 'grossWeightTo'){
                    if(key == 'grossWeightFrom'){
                        valFromGrossW = value;
                    }
                    if(key == 'grossWeightTo'){
                        valToGrossW= value;
                    }
                    let objLength = objRange.length +1;
                    objRange = {...objRange,'grossWeight':{'from':valFromGrossW,'to':valToGrossW},'length':objLength};
                }else if(key == 'proDateFrom' || key == 'proDateTo'){
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
                }else if(key == 'caseDimensionFrom' || key == 'caseDimensionTo'){
                    if(key == 'caseDimensionFrom'){
                        valDimensionFrom = value;
                    }
                    if(key == 'caseDimensionTo'){
                        valDimensionTo= value;
                    }
                    let objLength = objRange.length +1;
                    objRange = {...objRange,'caseDimension':{'from':valDimensionFrom,'to':valDimensionTo},'length':objLength};
                }else if(key == 'preciousMetalWeightFrom' || key == 'preciousMetalWeightTo'){
                    if(key == 'preciousMetalWeightFrom'){
                        valMetalWeightFrom = value;
                    }
                    if(key == 'preciousMetalWeightTo'){
                        valMetalWeightTo= value;
                    }
                    let objLength = objRange.length +1;
                    objRange = {...objRange,'preciousMetalWeight':{'from':valMetalWeightFrom,'to':valMetalWeightTo},'length':objLength};
                }else if(key == 'description'){
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
                }else if(key == 'hierarchy'){
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
                }else if(key == 'gemstones'){
                    filter = GetSearchGemstone(key, obj, userCurrency);
                }else{
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
        switch (sortDirections) {
            case 'asc':
                missing = '"missing" : "_first"';
                missing = `{"${sortBy}" : {${missing}}},`;
                break;
            default:
        }

        internals.query = JSON.parse(
            `{
                "timeout": "5s",
                "from": ${fromRecord},
                "size": ${sizeRecord},
                "sort" : [
                    ${missing}
                    {"${sortBy}" : "${sortDirections}"}
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
    } else {
        internals.query = JSON.parse(
            `{
                "timeout": "5s",
                "from": ${fromRecord},
                "size": ${sizeRecord},
                "sort" : [
                    ${missing}
                    {"${sortBy}" : "${sortDirections}"}
                 ],
                "query": {
                    "match_all": {}
                }
            }`
        );
    }
    return internals.query;
}
