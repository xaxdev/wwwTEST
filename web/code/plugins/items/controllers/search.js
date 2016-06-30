const Boom = require('boom');
const Hoek = require('hoek');
const Joi = require('joi');
const _ = require('lodash');

const internals = {
  filters: []
};

module.exports = {
  auth: false,
  handler: (request, reply) => {

    const elastic = request.server.plugins.elastic.client;
    // console.log('request.payload-->',request.payload);
    // const keys = Object.keys(request.payload);

    var obj = request.payload;
    var page = request.payload.page;
    var sortBy = request.payload.sortBy;
    var sortDirections = request.payload.sortDirections;
    var keys = Object.keys(obj);

    var objRange={length:0};
    var filter = '';
    var size = 8;
    var fromitem = (page-1)*size;

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

    var valFromCerDate = 0;
    var valToCerDate = 0;

    var valFromGrossW = 0;
    var valToGrossW = 0;

    internals.filters = [];

    if (keys.length != 3 ){
      keys.forEach((key) => {
        // console.log('keys-->',key);
        var value = obj[key];
        if(key == 'reference' || key == 'stoneType' || key == 'cut' || key == 'cutGrade' || key == 'clarity'
            || key == 'certificateAgency' || key == 'polish' || key == 'symmetry' || key == 'treatment'
            || key == 'fluorescence' || key == 'jewelryCategory' || key == 'collection' || key == 'brand'
            || key == 'mustHave' || key == 'ringSize' || key == 'dominantStone' || key == 'metalType'
            || key == 'metalColour' || key == 'gemstones.stoneType' || key == 'gemstones.cut' || key == 'gemstones.cutGrade'
            || key == 'gemstones.color' || key == 'gemstones.clarity' || key == 'gemstones.certificateAgency'
            || key == 'origin' || key == 'gemstones.origin' || key == 'gemstones.polish' || key == 'gemstones.symmetry'
            || key == 'gemstones.treatment' || key == 'gemstones.fluorescence' || key == 'watchCategory' || key == 'limitedEdition'
            || key == 'movement' || key == 'dialIndex' || key == 'dialColor' || key == 'dialMetal' || key == 'buckleType'
            || key == 'strapType' || key == 'strapColor' || key == 'complication' || key == 'warehouse' || key == 'location'
        ){
            value = `${value}`
            value = value.replace(/,/gi, ' ');
        }

        // console.log('key.value-->',value);
        if(key != 'page' && key != 'sortBy' && key != 'sortDirections' ){
          if(key == 'stoneType' || key == 'cut' || key == 'cutGrade' || key == 'clarity' || key == 'certificateAgency'
             || key == 'polish' || key == 'symmetry' || key == 'treatment' || key == 'fluorescence'
             || key == 'jewelryCategory' || key == 'collection' || key == 'brand'|| key == 'mustHave' || key == 'ringSize'
            || key == 'dominantStone' || key == 'metalType' || key == 'metalColour' || key == 'gemstones.stoneType'
            || key == 'gemstones.cut' || key == 'gemstones.cutGrade' || key == 'gemstones.color' || key == 'gemstones.clarity'
            || key == 'gemstones.certificateAgency' || key == 'origin' || key == 'gemstones.origin' || key == 'gemstones.polish'
            || key == 'gemstones.symmetry' || key == 'gemstones.treatment' || key == 'gemstones.fluorescence'
             || key == 'watchCategory' || key == 'limitedEdition' || key == 'movement' || key == 'dialIndex'
             || key == 'dialColor' || key == 'dialMetal' || key == 'buckleType' || key == 'strapType'
            || key == 'strapColor' || key == 'complication' || key == 'warehouse' || key == 'location'
          ){
            if(key == 'metalColour')
              key = 'metalColor'
            if(key == 'gemstones.stoneType')
              key = 'gemstones.subtype'
            if(key == 'location')
              key = 'site'
            if(key == 'jewelryCategory')
              key = 'subType'
            if(key == 'watchCategory')
              key = 'subType'
            if(key == 'ringSize')
              key = 'size'
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
            objRange = {...objRange,'totalCaratWeight':{'from':valFromCarat,'to':valToCarat},'length':objLength};
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
            objRange = {...objRange,'actualCostUSD':{'from':valFromCost,'to':valToCost},'length':objLength};
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
            objRange = {...objRange,'updatedCostUSD':{'from':valFromUpdatedCost,'to':valToUpdatedCost},'length':objLength};
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
            objRange = {...objRange,'priceUSD':{'from':valFromPPP,'to':valToPPP},'length':objLength};
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
          else if(key == 'cerDateFrom' || key == 'cerDateTo'){
            if(key == 'cerDateFrom'){
              // MM-dd-YYYY to YYYY-MM-dd
              var d = value.split('-');
              valFromCerDate = `${d[2]}-${d[0]}-${d[1]}`;
            }
            if(key == 'cerDateTo'){
              // MM-dd-YYYY to YYYY-MM-dd
              var d = value.split('-');
              valToCerDate= `${d[2]}-${d[0]}-${d[1]}`;
            }
            var objLength = objRange.length +1;
            objRange = {...objRange,'certifiiedDate':{'from':valFromCerDate,'to':valToCerDate},'length':objLength};
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
          else if(key == 'gemstones.cerDateFrom' || key == 'gemstones.cerDateTo'){
            if(key == 'gemstones.cerDateFrom'){
              // MM-dd-YYYY to YYYY-MM-dd
              var d = value.split('-');
              valFromCerDate = `${d[2]}-${d[0]}-${d[1]}`;
            }
            if(key == 'gemstones.cerDateTo'){
              // MM-dd-YYYY to YYYY-MM-dd
              var d = value.split('-');
              valToCerDate= `${d[2]}-${d[0]}-${d[1]}`;
            }
            var objLength = objRange.length +1;
            objRange = {...objRange,'gemstones.certificateDate':{'from':valFromCerDate,'to':valToCerDate},'length':objLength};
          }
          else if(key == 'gemstones.stoneCostFrom' || key == 'gemstones.stoneCostTo'){
            if(key == 'gemstones.stoneCostFrom'){
              valFromCost = value;
            }
            if(key == 'gemstones.stoneCostTo'){
              valToCost = value;
            }
            var objLength = objRange.length +1;
            objRange = {...objRange,'gemstones.cost':{'from':valFromCost,'to':valToCost},'length':objLength};
          }
          else if(key == 'gemstones.quantityFrom' || key == 'gemstones.quantityTo'){
            if(key == 'gemstones.quantityFrom'){
              valFromCost = value;
            }
            if(key == 'gemstones.quantityTo'){
              valToCost = value;
            }
            var objLength = objRange.length +1;
            objRange = {...objRange,'gemstones.quantity':{'from':valFromCost,'to':valToCost},'length':objLength};
          }
          else if(key == 'gemstones.totalCaratWeightFrom' || key == 'gemstones.totalCaratWeightTo'){
            if(key == 'gemstones.totalCaratWeightFrom'){
              valFromCost = value;
            }
            if(key == 'gemstones.totalCaratWeightTo'){
              valToCost = value;
            }
            var objLength = objRange.length +1;
            objRange = {...objRange,'gemstones.carat':{'from':valFromCost,'to':valToCost},'length':objLength};
          }
          else if(key == 'proDateFrom' || key == 'proDateTo'){
            if(key == 'proDateFrom'){
              // MM-dd-YYYY to YYYY-MM-dd
              var d = value.split('-');
              valFromCerDate = `${d[2]}-${d[0]}-${d[1]}`;
            }
            if(key == 'proDateTo'){
              // MM-dd-YYYY to YYYY-MM-dd
              var d = value.split('-');
              valToCerDate= `${d[2]}-${d[0]}-${d[1]}`;
            }
            var objLength = objRange.length +1;
            objRange = {...objRange,'productionDate':{'from':valFromCerDate,'to':valToCerDate},'length':objLength};
          }
          else if(key == 'caseDimensionFrom' || key == 'caseDimensionTo'){
            if(key == 'caseDimensionFrom'){
              valFromGrossW = value;
            }
            if(key == 'caseDimensionTo'){
              valToGrossW= value;
            }
            var objLength = objRange.length +1;
            objRange = {...objRange,'caseDimension':{'from':valFromGrossW,'to':valToGrossW},'length':objLength};
          }
          else if(key == 'preciousMetalWeightFrom' || key == 'preciousMetalWeightTo'){
            if(key == 'preciousMetalWeightFrom'){
              valFromGrossW = value;
            }
            if(key == 'preciousMetalWeightTo'){
              valToGrossW= value;
            }
            var objLength = objRange.length +1;
            objRange = {...objRange,'preciousMetalWeight':{'from':valFromGrossW,'to':valToGrossW},'length':objLength};
          }
          else if(key == 'description'){
            var filterSplit = [];
            // var vals = value.split(',');
            var vals = value.replace(',',' ');
            // vals.forEach((val)=>{
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
            console.log('hierarchy value-->', value)
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
              filterSplit.push(JSON.parse(mapField));
            });
            filter =
              `{
                "bool": {
                  "must": [
                      ${JSON.stringify(filterSplit)}
                    ]
                  }
                }`;
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
          }
        });
      }


      // console.log('sortBy-->',sortBy);
      // console.log('sortDirections-->',sortDirections);
      internals.query = JSON.parse(
      `{
        "timeout": "5s",
        "size": 10000,
        "sort" : [
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
    }else{
      internals.query = JSON.parse(
      `{
        "timeout": "5s",
        "size": 10000,
        "sort" : [
            {"${sortBy}" : "${sortDirections}"}
         ],
        "query":
         {
          "match_all": {}
         }
      }`);
    }



    console.log(JSON.stringify(internals.query, null, 2));
    elastic
      .search({
        index: 'mol',
        type: 'items',
        body: internals.query
      }).then(function (response) {
        var allData = [];
        var sumPriceData = [];
        var sumCostData = [];

        // console.log('response.hits.hits-->',response.hits.hits)

        var data = response.hits.hits.map((element) => element._source);
        if(sortDirections == 'desc'){
          data = _.sortBy(data,sortBy,sortDirections).reverse();
        }else{
          data = _.sortBy(data,sortBy,sortDirections);
        }

        // console.log('data-->',data);

        data.forEach(function(item){
          allData.push({'id': item.id,'reference':item.reference});
        });

        // console.log('size-->',size);
        // console.log('fromitem-->',fromitem);
        // var pageData = data.max(size) ;
        var pageData = data.slice( (page - 1) * size, page * size );
        var sumPrice = 0;
        var cost = 0;

        console.log('pageData-->',pageData.length);

        if(pageData.length != 0){
          data.forEach(function(item){
            // console.log('item.priceUSD-->',item.priceUSD);
            var p = item.priceUSD != undefined ? item.priceUSD : 0;
            sumPriceData.push(p);
          });

          sumPriceData.forEach(function(price) {
            sumPrice = sumPrice+Math.floor(price);
          });

          data.forEach(function(item){
            // console.log('item.priceUSD-->',item.priceUSD);
            var p = item.updatedCostUSD != undefined ? item.updatedCostUSD : 0;
            sumCostData.push(p);
          });

          cost = sumCostData.reduce(function(a, b) {
            return a + b;
          });
        }

        const sendData = {
                'data':pageData,
                'allData':allData,
                'summary':{
                    'count': allData.length,
                    'price': sumPrice,
                    'cost': cost
                  }
                }
        // console.log(JSON.stringify(sendData, null, 4));
        // console.log({sendData});
        elastic.close();
        return reply(sendData);
      })
      .catch(function (error) {
        console.log('error-->',error)
        elastic.close();
        return reply(Boom.badImplementation(err));
      });
  }
};
