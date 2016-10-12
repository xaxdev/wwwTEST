const GetSearchGemstone = require('../utils/getSearchGemstone');

const internals = {
  filters: []
};
module.exports = (request, fromRecord, sizeRecord, cb) => {
    // console.log('request-->',request);
    var obj = request.payload;
    var page = request.payload.page;
    var sortBy = request.payload.sortBy;
    var sortDirections = request.payload.sortDirections;
    var userCurrency = request.payload.userCurrency;
    var keys = Object.keys(obj);
    let fields = request.payload.fields;
    let price = request.payload.price;
    let userName = request.payload.userName;
    let ROOT_URL = request.payload.ROOT_URL;

    var objRange={length:0};
    var filter = '';
    var pageSize = request.payload.pageSize;
    var fromitem = (page-1)*pageSize;

    var keyFromLot = '';
    var valFromLot = 0;
    var valToLot = 0;

    var keyFromCarat = '';
    var valFromCarat = 0;
    var valToCarat = 0;

    var keyFromCost = '';
    var valFromCost = 0;
    var valToCost = 0;

    var keyFromUpdatedCost = '';
    var valFromUpdatedCost = 0;
    var valToUpdatedCost = 0;

    var keyFromPPP = '';
    var valFromPPP = 0;
    var valToPPP = 0;

    var keyFromMarkup = '';
    var valFromMarkup = 0;
    var valToMarkup = 0;

    var valFromGrossW = 0;
    var valToGrossW = 0;

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
        var value = obj[key];
        if(key == 'reference' || key == 'stoneType' || key == 'cut' || key == 'cutGrade' || key == 'clarity'
            || key == 'polish' || key == 'symmetry' || key == 'treatment' || key == 'location' || key == 'buckleType'
            || key == 'fluorescence' || key == 'jewelryCategory' || key == 'collection' || key == 'brand'
            || key == 'mustHave' || key == 'ringSize' || key == 'dominantStone' || key == 'metalType'
            || key == 'metalColour' || key == 'gemstones' || key == 'limitedEdition' || key == 'sku'
            || key == 'origin' || key == 'watchCategory'
            || key == 'movement' || key == 'dialIndex' || key == 'dialColor' || key == 'dialMetal'
            || key == 'strapType' || key == 'strapColor' || key == 'complication' || key == 'warehouse'
        ){
            value = `${value}`
            value = value.replace(/,/gi, ' ');
        }

        // console.log('key.value-->',value);
        if(key != 'page' && key != 'sortBy' && key != 'sortDirections' && key != 'userCurrency' && key != 'fields'
            && key != 'price' && key != 'pageSize' && key != 'ROOT_URL' && key != 'userName' && key != 'userEmail' ){
          if(key == 'stoneType' || key == 'cut' || key == 'cutGrade' || key == 'clarity' || key == 'certificateAgency'
             || key == 'polish' || key == 'symmetry' || key == 'treatment' || key == 'fluorescence'
             || key == 'jewelryCategory' || key == 'collection' || key == 'brand'|| key == 'mustHave' || key == 'ringSize'
             || key == 'dominantStone' || key == 'metalType' || key == 'metalColour'
             || key == 'origin' || key == 'watchCategory' || key == 'limitedEdition' || key == 'movement' || key == 'dialIndex'
             || key == 'dialColor' || key == 'dialMetal' || key == 'buckleType' || key == 'strapType' || key == 'strapColor'
             || key == 'complication' || key == 'warehouse' || key == 'location' || key=='certificatedNumber'
          ){
            if(key == 'metalColour')
              key = 'metalColor'
            if(key == 'location')
              key = 'site'
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
            var objLength = objRange.length +1;
            objRange = {...objRange,'quantity':{'from':valFromLot,'to':valToLot},'length':objLength};
          }
          else if(key == 'totalCaratWeightFrom' || key == 'totalCaratWeightTo'){
            keyFromCarat = 'totalCaratWeight';
            if(key == 'totalCaratWeightFrom'){
              valFromCarat = value;
            }
            if(key == 'totalCaratWeightTo'){
              valToCarat = value;
            }
            var objLength = objRange.length +1;
            objRange = {...objRange,'carat':{'from':valFromCarat,'to':valToCarat},'length':objLength};

          }
          else if(key == 'totalCostFrom' || key == 'totalCostTo'){
            keyFromCost = 'costUSD';
            if(key == 'totalCostFrom'){
              valFromCost = value;
            }
            if(key == 'totalCostTo'){
              valToCost = value;
            }
            var objLength = objRange.length +1;
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
          }
          else if(key == 'totalUpdatedCostFrom' || key == 'totalUpdatedCostTo'){
            keyFromUpdatedCost = 'updatedCostUSD';
            if(key == 'totalUpdatedCostFrom'){
              valFromUpdatedCost = value;
            }
            if(key == 'totalUpdatedCostTo'){
              valToUpdatedCost = value;
            }
            var objLength = objRange.length +1;
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
          }
          else if(key == 'publicPriceFrom' || key == 'publicPriceTo'){
            keyFromPPP = 'priceUSD';
            if(key == 'publicPriceFrom'){
              valFromPPP = value;
            }
            if(key == 'publicPriceTo'){
              valToPPP = value;
            }
            var objLength = objRange.length +1;
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
          }
          else if(key == 'markupFrom' || key == 'markupTo'){
            keyFromMarkup = 'markup';
            if(key == 'markupFrom'){
              valFromMarkup = value;
            }
            if(key == 'markupTo'){
              valToMarkup= value;
            }
            var objLength = objRange.length +1;
            objRange = {...objRange,'markup':{'from':valFromMarkup,'to':valToMarkup},'length':objLength};
          }
          else if(key == 'grossWeightFrom' || key == 'grossWeightTo'){
            if(key == 'grossWeightFrom'){
              valFromGrossW = value;
            }
            if(key == 'grossWeightTo'){
              valToGrossW= value;
            }
            var objLength = objRange.length +1;
            objRange = {...objRange,'grossWeight':{'from':valFromGrossW,'to':valToGrossW},'length':objLength};
          }

          else if(key == 'proDateFrom' || key == 'proDateTo'){
            if(key == 'proDateFrom'){
              // MM-dd-YYYY to YYYY-MM-dd
              var d = value.split('-');
              valFromProDate = `${d[2]}-${d[0]}-${d[1]}`;
            }
            if(key == 'proDateTo'){
              // MM-dd-YYYY to YYYY-MM-dd
              var d = value.split('-');
              valToProDate= `${d[2]}-${d[0]}-${d[1]}`;
            }
            var objLength = objRange.length +1;
            objRange = {...objRange,'productionDate':{'from':valFromProDate,'to':valToProDate},'length':objLength};
          }
          else if(key == 'caseDimensionFrom' || key == 'caseDimensionTo'){
            if(key == 'caseDimensionFrom'){
              valDimensionFrom = value;
            }
            if(key == 'caseDimensionTo'){
              valDimensionTo= value;
            }
            var objLength = objRange.length +1;
            objRange = {...objRange,'caseDimension':{'from':valDimensionFrom,'to':valDimensionTo},'length':objLength};
          }
          else if(key == 'preciousMetalWeightFrom' || key == 'preciousMetalWeightTo'){
            if(key == 'preciousMetalWeightFrom'){
              valMetalWeightFrom = value;
            }
            if(key == 'preciousMetalWeightTo'){
              valMetalWeightTo= value;
            }
            var objLength = objRange.length +1;
            objRange = {...objRange,'preciousMetalWeight':{'from':valMetalWeightFrom,'to':valMetalWeightTo},'length':objLength};
          }
          else if(key == 'description'){
            var filterSplit = [];
            // var vals = value.split(',');
            var vals = value.replace(',',' ');
            var mapField =
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
          }
          else if(key == 'hierarchy'){
            var filterSplit = [];
            // console.log('hierarchy value-->', value)
            var vals = value.split(',');
            vals.forEach((val)=>{
              var mapField =
                    `{
                        "match": {
                          "hierarchy": {
                            "query": "${val.trim()}",
                            "type": "phrase"
                          }
                        }
                      }`;
              // console.log('mapField-->',mapField);
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
          }
          else if(key == 'gemstones'){

            filter = GetSearchGemstone(key, obj, userCurrency);
          }
          else
          {
            filter =
              `{
                "match": {
                  "${key}": {
                    "query": "${value}"
                  }
                }
              }`;
          }
          // console.log('objRange-->',objRange);
          // console.log('objRange.length-->',objRange.length);
          // console.log('filter-->',filter);
          if(filter != ''){
            internals.filters.push(JSON.parse(filter));
            filter = '';
            // console.log('internals.filters-->',JSON.stringify(internals.filters));
          }
        }
      });
      if(objRange.length != 0){
        var keysObjRange = Object.keys(objRange);
        // console.log('keysObjRange-->',keysObjRange);
        keysObjRange.forEach((key) => {
          // console.log('keysObjRange[key]-->',objRange[key].from);
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

      // console.log('sortBy-->',sortBy);
      // console.log('sortDirections-->',sortDirections);
      let missing = '';

      switch (sortDirections) {
        case 'asc':
          missing = '"missing" : "_first"';
          missing = `{"${sortBy}" : {${missing}}},`;
          break;
        default:
      }

      // console.log('missing-->',missing);

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
      }`);
    }
    else
    {
      internals.query = JSON.parse(
      `{
        "timeout": "5s",
        "from": ${fromRecord},
        "size": ${sizeRecord},
        "sort" : [
            ${missing}
            {"${sortBy}" : "${sortDirections}"}
         ],
        "query":
         {
          "match_all": {}
         }
      }`);
    }
    return internals.query;
}
