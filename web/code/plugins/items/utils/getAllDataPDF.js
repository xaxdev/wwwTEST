const Boom = require('boom');
import Elasticsearch from 'elasticsearch'
const Promise = require('bluebird');
const _ = require('lodash');
const GetPriceCurrency = require('./getPriceCurrency');

module.exports = async (response, sortDirections, sortBy, size, page, userCurrency, keys, obj, request,
    itemsOrder, setReferencdOrder, itemsNotMMECONSResult, itemsMMECONSResult, cb) => {

  try {
      let allData = [];
      let setReferences = [];
      let sumPriceData = [];
      let sumCostData = [];
      let exportData = null;
      let itemCount = response.hits.total;
      let avrgPrice = 0;
      let isViewAsSet = !!keys.find((key) => {return key == 'viewAsSet'});
      let data = response.hits.hits.map((element) => element._source);
    //   let dataRemove = response.hits.hits.map((element) => element._source);
    //
    //   //    Find unique item reference
    //   const unique = [...new Set(data.map(item => item.reference))];
    //
    //   //   Create data item reference and count items {'reference:xx'}
    //   let countReference = count(data, function (item) {
    //       return item.reference
    //   });
    //
    // //   console.log('countReference-->',countReference);
    // //   console.log('data.length-->',data.length);
    //
    //   //   Find key condition warehouse
    //   if (!!keys.find((key) => {return key == 'warehouse'})) {
    //       if (obj['warehouse'].indexOf('MME.CONS') != -1) {
    //           //   intersection first array
    //           data = inFirstOnly(data, itemsNotMMECONSResult);
    //       }
    //   } else {
    //       //   intersection first array
    //     //   data = inFirstOnly(data, itemsMMECONSResult);
    //       //   remove duplicate item warehouse = MME.CONS
    //       if (unique.length != data.length) {
    //           data.map(async (item, index, array) => {
    //             //   console.log('item.reference-->',item.reference );
    //             //   console.log('item.warehouse-->',item.warehouse );
    //               unique.map((it) => {
    //                 //   console.log('it-->',it);
    //                 //   console.log('countReference[it]-->',countReference[it]);
    //                   if (countReference[it] > 1) {
    //                       if (item.reference == it) {
    //                           if (item.warehouse == 'MME.CONS') {
    //                               dataRemove.splice(index,1)
    //                             //   console.log('dataRemove-->',dataRemove.length);
    //                             //   console.log('data-->',data.length);
    //                           }
    //                       }
    //                   }
    //               })
    //           })
    //           data = dataRemove;
    //       }
    //   }

      if (itemsOrder != null) {
          data.map((item) => {
              let order = itemsOrder.find((val) => {
                  return val.item_reference == item.reference;
              })
              item.order = parseInt(order.order)
              return item;
          });
          data = data.sortBy('order','asc',userCurrency);
      }
      if (setReferencdOrder != null) {
          data.map((item) => {
              let order = null;
              if (isViewAsSet) {
                  order = setReferencdOrder.find((val) => {
                      return val.set_reference == item.reference;
                  });
              }else{
                  order = setReferencdOrder.find((val) => {
                      return val.set_reference == item.setReference;
                  });
              }
              item.order = parseInt(order.order)
              return item;
          });
          data = data.sortBy('order','asc',userCurrency);
      }

      if (isViewAsSet) {
          switch (sortBy) {
              case 'setReference':
                  sortBy = 'reference';
                  break;
              case 'itemCreatedDate':
                  sortBy = 'createdDate';
                  break;
              default:
                  sortBy = sortBy.toLowerCase().indexOf('price') != -1 ? 'totalPrice' : sortBy
                  userCurrency = sortBy.toLowerCase().indexOf('price') != -1 ? 'USD' : userCurrency
                  break;
          }
      }else{
          sortBy = sortBy.toLowerCase().indexOf('price') != -1 ? 'price' : sortBy
      }

      if (itemsOrder == null && setReferencdOrder == null) {
          data = data.sortBy(sortBy,sortDirections,userCurrency);
      }

      if (isViewAsSet) {
          data = data.filter((item) => {
              return item.setReference !== '';
          });
      }

      data.forEach(function(item){
        // filter data from array lotnaumer
        if (item.type == 'STO') {
            let newLot = item.lotNumbers;
            if (item.lotNumbers.length > 0) {
                    if (keys.length != 3 ){
                        keys.forEach((key) => {
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
          if (isViewAsSet) {
              allData.push({'id': item.id,'reference':item.reference,'createdDate':item.createdDate,
                            'totalPrice':item.totalPrice,'description':item.description,'setReference':item.reference
                            });
          }else{
              allData.push({'id': item.id,'reference':item.reference,'itemCreatedDate':item.itemCreatedDate,
                            'price':item.price,'description':item.description,'setReference':item.setReference
                            });
          }

          if (item.setReference !== undefined && item.setReference !== '') {
              setReferences.push({'reference':item.setReference});
          }
          if(item.price != undefined){
              if(item.price[userCurrency] != undefined){
                if(item.price[userCurrency] != 0){
                  maxPrice = Math.max(maxPrice, item.price[userCurrency]);
                }else{
                  maxPrice = Math.max(maxPrice, 0);
                }
              }else{
                item.price[userCurrency] = 0;
                maxPrice = Math.max(maxPrice, 0);
              }
          }else{
              if (isViewAsSet) {
                  if(item.totalPrice['USD'] != undefined){
                    if(item.totalPrice['USD'] != 0){
                      maxPrice = Math.max(maxPrice, item.totalPrice['USD']);
                    }else{
                      maxPrice = Math.max(maxPrice, 0);
                    }
                  }else{
                    item.totalPrice['USD'] = 0;
                    maxPrice = Math.max(maxPrice, 0);
                  }
              }else {
                  if(maxPrice > 0){
                    maxPrice = maxPrice;
                  }else{
                    maxPrice = 0;
                  }
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
              if (isViewAsSet) {
                  if(item.totalPrice['USD'] != undefined){
                    minPrice = Math.min(minPrice, item.totalPrice['USD']);
                  }else{
                    minPrice = Math.min(minPrice, 0);
                  }
              }else{
                  minPrice = 0;
              }
          }
      });

      if (itemsOrder == null && setReferencdOrder == null) {
          allData = allData.sortBy(sortBy,sortDirections,userCurrency);
      }

      exportData = data;

      let pageData = data.slice( (page - 1) * size, page * size );
      let sumPrice = 0;
      let sumCost = 0;

      if(pageData.length != 0){
        data.forEach(function(item){
          if (isViewAsSet) {
              sumPriceData.push(item.totalPrice['USD']);
          }else {
              sumPriceData.push(GetPriceCurrency(item,'price',userCurrency));
          }
        });

        sumPriceData.forEach(function(price) {
          sumPrice = sumPrice+Math.round(price);
        });
        avrgPrice = sumPrice/itemCount;

        data.forEach(function(item){
          if (isViewAsSet) {
              sumCostData.push(item.totalUpdatedCost['USD']);
          }else {
              sumCostData.push(GetPriceCurrency(item,'updatedCost',userCurrency));
          }
        });

        sumCostData.forEach(function(cost) {
          sumCost = sumCost+Math.round(cost);
        });
      }

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
  } catch (err) {
      console.log(err);
  }
}

const getSetReferencesData = async (setReferences, request) => {
    const setReferencesData = [];
    const elastic = new Elasticsearch.Client({
                    host: request.elasticsearch.host,
                    keepAlive: false
                });
    try {
        const getSetreference = async (response) => {
            console.log('response-->',response);
          const query = JSON.parse(
            `{
              "query":{
                   "constant_score": {
                     "filter": {
                       "bool": {
                         "must": [
                           {
                             "match": {
                               "reference": "${response}"
                             }
                           }
                         ]
                       }
                     }
                   }
                }
              }`);

          return elastic.search({
                  index: 'mol',
                  type: 'setitems',
                  body: query
                });
        };
        const listSetData =  (setReferences) =>{
            setReferences.map((set) => {
                return set.reference;
            });
        }

        Promise.all([listSetData(setReferences), getSetreference]).spread((setDatas, setReference) => {
            let setData = setReference(set.reference);
        })
        .catch(function(err) {
            elastic.close();
            console.log(err);
            return reply(Boom.badImplementation(err));
        });

        await console.log('setReferencesData-->',setReferencesData.length);
        await elastic.close();
        return setReferencesData
    } catch (err) {
        elastic.close();
        throw err
    }
}

const compareBy = (property, order = 'asc', userCurrency) => (a, b) => {
    if(!a.hasOwnProperty(property) || !b.hasOwnProperty(property)) {
        return 0;
    }
    let priceA = 0;
    let priceB = 0;
    const first = (property.toLowerCase().indexOf('price') != -1)
                  ? a[property] != undefined
                      ? a[property][userCurrency] != undefined ? a[property][userCurrency] : 0
                      : 0
                  : a[property]
    const second = (property.toLowerCase().indexOf('price') != -1)
                  ? b[property] != undefined
                      ? b[property][userCurrency] != undefined ? b[property][userCurrency] : 0
                      : 0
                  : b[property]
    if (typeof first !== typeof second) {
        return 0
    }

    let comparison = 0
    if (first > second) {
        comparison = 1
    }

    if (first < second) {
        comparison = -1
    }

    return (order === 'desc')? (comparison * -1) : comparison
}

Array.prototype.sortBy = function(property, order = 'asc', userCurrency) {
    return Array.prototype.sort.call(this, compareBy(property, order, userCurrency))
}

const count = (ary, classifier) => {
    classifier = classifier || String;
    return ary.reduce(function (counter, item) {
        var p = classifier(item);
        counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
        return counter;
    }, {})
};

// Generic helper function that can be used for the three operations:
const operation = (list1, list2, isUnion) => {
    return list1.filter( a => isUnion === list2.some( b => a.reference === b.reference ) );
}

// Following functions are to be used:
const unionAarry = (list1, list2) => {
    return operation(list1, list2, true);
}

const inFirstOnly = (list1, list2) => {
    return operation(list1, list2, false);
}

const inSecondOnly = (list1, list2) => {
    return inFirstOnly(list2, list1);
}
