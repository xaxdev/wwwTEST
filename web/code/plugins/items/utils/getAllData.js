const _ = require('lodash');
const GetPriceCurrency = require('./getPriceCurrency');

module.exports = (response, sortDirections, sortBy, size, page, userCurrency, cb) => {
  console.log(response.hits.total)
  var allData = [];
  var sumPriceData = [];
  var sumCostData = [];
  var exportData = null;

  var data = response.hits.hits.map((element) => element._source);
  if(sortDirections == 'desc'){
    data = _.sortBy(data,sortBy,sortDirections).reverse();
  }else{
    data = _.sortBy(data,sortBy,sortDirections);
  }

  exportData = data;
  // console.log('data-->',data);
  data.forEach(function(item){
    allData.push({'id': item.id,'reference':item.reference});
  });

  // var pageData = data.max(size) ;
  var pageData = data.slice( (page - 1) * size, page * size );
  var sumPrice = 0;
  var cost = 0;

  console.log('pageData-->',pageData.length);

  if(pageData.length != 0){
    data.forEach(function(item){
      // console.log('item.priceUSD-->',item.priceUSD);

      sumPriceData.push(GetPriceCurrency(item,'price',userCurrency));
    });

    sumPriceData.forEach(function(price) {
      sumPrice = sumPrice+Math.floor(price);
    });

    data.forEach(function(item){
      // console.log('item.priceUSD-->',item.priceUSD);

      sumCostData.push(GetPriceCurrency(item,'updatedCost',userCurrency));
    });

    cost = sumCostData.reduce(function(a, b) {
      return a + b;
    });
  }

  const sendData = {
          'data':pageData,
          'allData':allData,
          'exportData': exportData,
          'summary':{
              'count': allData.length,
              'price': sumPrice,
              'cost': cost
            }
          };
  return sendData;
}
