const _ = require('lodash');
const GetPriceCurrency = require('./getPriceCurrency');

module.exports = (response, sortDirections, sortBy, size, page, userCurrency, cb) => {
  console.log(response.hits.total)
  let allData = [];
  let sumPriceData = [];
  let sumCostData = [];
  let exportData = null;
  let itemCount = response.hits.total;
  let avrgPrice = 0;

  let data = response.hits.hits.map((element) => element._source);
  if(sortDirections == 'desc'){
    data = _.sortBy(data,sortBy,sortDirections).reverse();
  }else{
    data = _.sortBy(data,sortBy,sortDirections);
  }

  exportData = data;
  // console.log('data-->',data);
  let maxPrice = 0;


  data.forEach(function(item){
    allData.push({'id': item.id,'reference':item.reference});
    if(item.price != undefined){
      maxPrice = Math.max(maxPrice, item.price[userCurrency]);
    }else{
      maxPrice = 0;
    }
  });

  let minPrice = maxPrice;
  data.forEach(function(item){
    if(item.price != undefined){
      minPrice = Math.min(minPrice, item.price[userCurrency]);
    }else{
      minPrice = 0;
    }
  });

  // let pageData = data.max(size) ;
  let pageData = data.slice( (page - 1) * size, page * size );
  let sumPrice = 0;
  let sumCost = 0;

  console.log('pageData-->',pageData.length);
  console.log('maxPrice-->',maxPrice);
  console.log('minPrice-->',minPrice);

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
    });
    console.log('sumCostData-->',sumCostData.length);
    sumCostData.forEach(function(cost) {
      // console.log('cost-->',cost);
      sumCost = sumCost+Math.round(cost);
    });
    console.log('sumCost-->',sumCost);

    // cost = sumCostData.reduce(function(a, b) {
    //   return a + b;
    // });
  }

  const sendData = {
          'data':pageData,
          'allData':allData,
          'exportData': exportData,
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
