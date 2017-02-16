const GetLotMatchSearch = require('../utils/getLotMatchSearch');

module.exports = (key, obj, userCurrency, cb) => {
  // const lotFields = Object.keys(key);
  const valusObj = obj[key];
  const lotFields = Object.keys(valusObj);
  let lotFilterSplit = [];
  let lotFilter = '';
  let objRangeLot={length:0};

  let valFromCerDate = 0;
  let valToCerDate = 0;
  let valCaratWeightFrom = 0;
  let valCaratWeightTo = 0;
  let valStoneFromCost = 0;
  let valStoneToCost = 0;
  let valQuantityFrom = 0;
  let valQuantityTo = 0;

  lotFields.forEach((key)=>{
    const fieldValus = valusObj[key];

    if(key == 'lotNumber'){
      lotFilterSplit.push(JSON.parse(GetLotMatchSearch('lotNumber',fieldValus)));
    }
    if(key == 'cut'){
      lotFilterSplit.push(JSON.parse(GetLotMatchSearch('cut',fieldValus)));
    }
    if(key == 'color'){
      lotFilterSplit.push(JSON.parse(GetLotMatchSearch('color',fieldValus)));
    }
    if(key == 'clarity'){
      lotFilterSplit.push(JSON.parse(GetLotMatchSearch('clarity',fieldValus)));
    }
    if(key == 'totalCaratWeightFrom' || key == 'totalCaratWeightTo'){
      if(key == 'totalCaratWeightFrom'){
        valCaratWeightFrom = fieldValus;
      }
      if(key == 'totalCaratWeightTo'){
        valCaratWeightTo = fieldValus;
      }
      var objLength = objRangeLot.length +1;
      objRangeLot = {...objRangeLot,'lotNumbers.carat':{'from':valCaratWeightFrom,'to':valCaratWeightTo},'length':objLength};
    }
    if(key == 'lotQuantityFrom' || key == 'lotQuantityTo'){
      if(key == 'lotQuantityFrom'){
        valQuantityFrom = fieldValus;
      }
      if(key == 'lotQuantityTo'){
        valQuantityTo = fieldValus;
      }
      var objLength = objRangeLot.length +1;
      objRangeLot = {...objRangeLot,'lotNumbers.lotQty':{'from':valQuantityFrom,'to':valQuantityTo},'length':objLength};
    }
    if(key == 'cerDateFrom' || key == 'cerDateTo'){
      if(key == 'cerDateFrom'){
        // MM-dd-YYYY to YYYY-MM-dd
        var d = fieldValus.split('-');
        valFromCerDate = `${d[2]}-${d[0]}-${d[1]}`;
      }
      if(key == 'cerDateTo'){
        // MM-dd-YYYY to YYYY-MM-dd
        var d = fieldValus.split('-');
        valToCerDate= `${d[2]}-${d[0]}-${d[1]}`;
      }
      var objLength = objRangeLot.length +1;
      objRangeLot = {...objRangeLot,'gemstones.certificate.issuedDate':{'from':valFromCerDate,'to':valToCerDate},'length':objLength};
    }
  });

  if(objRangeLot.length != 0){
    var keysobjRangeLot = Object.keys(objRangeLot);
    // console.log('keysObjRange-->',keysObjRange);
    keysobjRangeLot.forEach((key) => {
      // console.log('keysObjRange[key]-->',objRange[key].from);
      if(key != 'length'){
        if(objRangeLot[key].to != 0){
          lotFilter =
            `{
              "range": {
                "${key}": {
                  "gte": "${objRangeLot[key].from}",
                  "lte": "${objRangeLot[key].to}"
                }
              }
            }`;
        }else{
          lotFilter =
            `{
              "range": {
                "${key}": {
                  "gte": "${objRangeLot[key].from}"
                }
              }
            }`;
        }
        lotFilterSplit.push(JSON.parse(lotFilter));
        lotFilter = '';
      }
    });
  }

  let filter =
  `{
    "nested": {
      "path": "lotNumbers",
      "query": {
        "bool": {
          "must":
            ${JSON.stringify(lotFilterSplit)}
        }
      }
    }
  }`;
  return filter;
}
