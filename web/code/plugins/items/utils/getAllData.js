const _ = require('lodash');
const GetPriceCurrency = require('./getPriceCurrency');
// import numberFormat from '../../http/src/utils/convertNumberformatwithcomma2digit';

module.exports = (response, sortDirections, sortBy, size, page, userCurrency, keys, obj, cb) => {
  // console.log(response.hits.total)
  let allData = [];
  let sumPriceData = [];
  let sumCostData = [];
  let exportData = null;
  let itemCount = response.hits.total;
  let avrgPrice = 0;

  let data = response.hits.hits.map((element) => element._source);
  // if(sortDirections == 'desc'){
  //   data = _.sortBy(data,sortBy,sortDirections).reverse();
  // }else{
  //   data = _.sortBy(data,sortBy,sortDirections);
  // }
  // console.log(keys);
  data.forEach(function(item){
    // filter data from array lotnaumer
    if (item.type == 'STO') {
        let newLot = item.lotNumbers;
        if (item.lotNumbers.length > 0) {
                if (keys.length != 3 ){
                    keys.forEach((key) => {
                        // console.log('key-->',key);
                        if(key == 'lotNumbers'){
                            const valusObj = obj[key];
                            const lotFields = Object.keys(valusObj);
                            lotFields.forEach((field)=>{
                                const fieldValus = valusObj[field];
                                let arrayFieldValus = fieldValus.split('-');
                                if (field == 'totalCaratWeightFrom') {
                                    newLot = newLot.filter((item) => {
                                                            return item.carat >= fieldValus
                                                        });
                                }
                                if (field == 'totalCaratWeightTo') {
                                    newLot = newLot.filter((item) => {
                                                            return item.carat <= fieldValus
                                                        });
                                }
                                if (field == 'lotQuantityFrom') {
                                    newLot = newLot.filter((item) => {
                                                            return item.lotQty >= fieldValus
                                                        });
                                }
                                if (field == 'lotQuantityTo') {
                                    newLot = newLot.filter((item) => {
                                                            return item.lotQty <= fieldValus
                                                        });
                                }
                                if (field == 'markupFrom') {
                                    newLot = newLot.filter((item) => {
                                                            return item.markup >= fieldValus
                                                        });
                                }
                                if (field == 'markupTo') {
                                    newLot = newLot.filter((item) => {
                                                            return item.markup <= fieldValus
                                                        });
                                }
                                if (field == 'cut') {
                                    let customLot = [];
                                    let custom = [];
                                    // console.log('newLot-->',newLot);
                                    if (fieldValus.indexOf(',') != -1) {
                                        let values =  fieldValus.split(',');
                                        values.forEach((val)=>{
                                            customLot = newLot.filter((item) => {
                                                                    return item.cut == val
                                                                });
                                            if (customLot.length > 0) {
                                                newLot = custom.concat(customLot);
                                            }
                                        });
                                    }else{
                                        newLot = newLot.filter((item) => {
                                                                return item.cut == fieldValus
                                                            });
                                    }
                                }
                                if (field == 'color') {
                                    let customLot = [];
                                    let custom = [];
                                    if (fieldValus.indexOf(',') != -1) {
                                        let values =  fieldValus.split(',');
                                        values.forEach((val)=>{
                                            customLot = newLot.filter((item) => {
                                                                    return item.color == val
                                                                });
                                            if (customLot.length > 0) {
                                                newLot = custom.concat(customLot);
                                            }
                                        });
                                    }else{
                                        newLot = newLot.filter((item) => {
                                                                return item.color == fieldValus
                                                            });
                                    }
                                }
                                if (field == 'clarity') {
                                    let customLot = [];
                                    let custom = [];
                                    if (fieldValus.indexOf(',') != -1) {
                                        let values =  fieldValus.split(',');
                                        values.forEach((val)=>{
                                            customLot = newLot.filter((item) => {
                                                                    return item.clarity == val
                                                                });
                                            if (customLot.length > 0) {
                                                newLot = custom.concat(customLot);
                                            }
                                        });
                                    }else{
                                        newLot = newLot.filter((item) => {
                                                                return item.clarity == fieldValus
                                                            });
                                    }
                                    // console.log(newLot);
                                }
                            })
                        }
                    })
                }
        }
        item.lotNumbers = newLot;
        if (newLot.length == 0 ) {
            data = data.filter((lot) => {
                return lot.reference != item.reference
            })
        }
    }
  });

  let maxPrice = 0;

  data.forEach(function(item){
    allData.push({'id': item.id,'reference':item.reference});

    if(item.price != undefined){
      if(item.price[userCurrency] != undefined){
        // console.log('item.reference-->',item.reference);
        // console.log('item.price[userCurrency]-->',item.price[userCurrency]);
        if(item.price[userCurrency] != 0){
          maxPrice = Math.max(maxPrice, item.price[userCurrency]);
        }else{
          maxPrice = Math.max(maxPrice, 0);
        }
      }else{
        item.price[userCurrency] = 0;
        maxPrice = Math.max(maxPrice, 0);
      }

      // console.log('maxPrice-->',maxPrice);
    }else{
      if(maxPrice > 0){
        maxPrice = maxPrice;
      }else{
        maxPrice = 0;
      }
    }
  });

  let minPrice = maxPrice;
  data.forEach(function(item){
      if(item.price != undefined){
        if(item.price[userCurrency] != undefined){
          minPrice = Math.min(minPrice, item.price[userCurrency]);
        }else{
          minPrice = Math.min(minPrice, 0);
        }
      }else{
        minPrice = 0;
      }
  });
  exportData = data;

  let pageData = data.slice( (page - 1) * size, page * size );
  let sumPrice = 0;
  let sumCost = 0;

  if(pageData.length != 0){
    data.forEach(function(item){
      // console.log('item.priceUSD-->',item.priceUSD);

      sumPriceData.push(GetPriceCurrency(item,'price',userCurrency));
    });

    sumPriceData.forEach(function(price) {
      sumPrice = sumPrice+Math.round(price);
    });
    avrgPrice = sumPrice/itemCount;

    data.forEach(function(item){
      // console.log('item.priceUSD-->',item.priceUSD);

      sumCostData.push(GetPriceCurrency(item,'updatedCost',userCurrency));
    //   console.log('lot-last-->',item.lotNumbers.length);
    });

    sumCostData.forEach(function(cost) {
      // console.log('cost-->',cost);
      sumCost = sumCost+Math.round(cost);
    });
    // console.log('sumCost-->',sumCost);
  }

  // console.log('getAllData listFileName-->',listFileName[0]);

  const sendData = {
          'data':pageData,
          'allData':allData,
          'exportData': exportData,
          'pageSize': size,
          'summary':{
              'count': allData.length,
              'price': sumPrice,
              'cost': sumCost,
              'maxPrice': maxPrice,
              'minPrice': minPrice,
              'avrgPrice': avrgPrice
            }
          };
  return sendData;
}
