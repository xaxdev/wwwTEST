const Boom = require('boom');
import Elasticsearch from 'elasticsearch'
const Promise = require('bluebird');
const _ = require('lodash');
const GetPriceCurrency = require('./getPriceCurrency');

module.exports = async (response, sortDirections, sortBy, size, page, userCurrency, keys, obj, request, itemsOrder, setReferencdOrder, isSetReference, cb) => {
    try {
        let allData = [];
        let setReferences = [];
        let sumPriceData = [];
        let sumCostData = [];
        let exportData = null;
        let itemCount = response.length;
        let avrgPrice = 0;
        let isViewAsSet = !!keys.find((key) => {return key == 'viewAsSet'});
        let data = response;
        let clarityData = [];
        let sumNetAmountData = [];
        let sumDisconstData = [];
        let sumMarginData = [];

        if (!!keys.find((key) => {return key == 'gemstones'})) {
            const valusObj = obj['gemstones'];
            const clarityFields = Object.keys(valusObj);
            if (!!clarityFields.find((key) => {return key == 'clarity'})) {
                const clarities = valusObj.clarity.split(',');
                clarities.map((clar) => {
                    let newSource = data;
                    newSource.map((item) => {
                        if (item.gemstones.findIndex(({clarity}) => clarity === clar) != -1) {
                            if (clarityData.findIndex(({reference}) => reference === item.reference) == -1) {
                                clarityData.push(item);
                            }
                        }
                    })

                })
                data = clarityData;
            }
        }

        if (itemsOrder != null) {
            data.map((item) => {
                let order = itemsOrder.find((val) => {return val.item_reference == item.reference})
                item.order = parseInt(order.order)
                return item;
            });
            data = data.sortBy('order','asc',userCurrency);
        }
        if (setReferencdOrder != null) {
            data.map((item) => {
                let order = null;
                if (isViewAsSet) {
                    order = setReferencdOrder.find((val) => {return val.set_reference == item.reference});
                }else{
                    order = setReferencdOrder.find((val) => {return val.set_reference == item.setReference});
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
                case 'postedDate':
                    sortBy = 'postedDate';
                    break;
                default:
                    sortBy = sortBy.toLowerCase().indexOf('netamount') != -1 ? 'totalNetAmount' : sortBy
                    userCurrency = sortBy.toLowerCase().indexOf('netamount') != -1 ? 'USD' : userCurrency
                    break;
            }
        }else{
            sortBy = sortBy.toLowerCase().indexOf('netamount') != -1 ? 'netAmount' : sortBy
        }
        // console.log('sortBy-->',sortBy);

        if (itemsOrder == null && setReferencdOrder == null) {
            //   Not have SetReference criteria
            if (!isSetReference) {
                data = data.sortBy(sortBy,sortDirections,userCurrency);
                // console.log('data-->',data[0]);
            }
        }

        if (isViewAsSet) {
            data = data.filter((item) => {return item.setReference !== ''});
        }

        data.forEach(function(item){
            // filter data from array lotnaumer
            if (item.type == 'STO') {
                if (!!item.lotNumbers) {
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
                                            newLot = newLot.filter((item) => { return item.carat >= fieldValus });
                                        }
                                        if (field == 'totalCaratWeightTo') {
                                            newLot = newLot.filter((item) => { return item.carat <= fieldValus });
                                        }
                                        if (field == 'lotQuantityFrom') {
                                            newLot = newLot.filter((item) => { return item.lotQty >= fieldValus });
                                        }
                                        if (field == 'lotQuantityTo') {
                                            newLot = newLot.filter((item) => { return item.lotQty <= fieldValus });
                                        }
                                        if (field == 'markupFrom') {
                                            newLot = newLot.filter((item) => { return item.markup >= fieldValus });
                                        }
                                        if (field == 'markupTo') {
                                            newLot = newLot.filter((item) => { return item.markup <= fieldValus });
                                        }
                                        if (field == 'cut') {
                                            let customLot = [];
                                            let custom = [];
                                            if (fieldValus.indexOf(',') != -1) {
                                                let values =  fieldValus.split(',');
                                                values.forEach((val)=>{
                                                    customLot = newLot.filter((item) => { return item.cut == val });
                                                    if (customLot.length > 0) {
                                                        newLot = custom.concat(customLot);
                                                    }
                                                });
                                            }else{
                                                newLot = newLot.filter((item) => { return item.cut == fieldValus });
                                            }
                                        }
                                        if (field == 'color') {
                                            let customLot = [];
                                            let custom = [];
                                            if (fieldValus.indexOf(',') != -1) {
                                                let values =  fieldValus.split(',');
                                                values.forEach((val)=>{
                                                    customLot = newLot.filter((item) => { return item.color == val });
                                                    if (customLot.length > 0) {
                                                        newLot = custom.concat(customLot);
                                                    }
                                                });
                                            }else{
                                                newLot = newLot.filter((item) => { return item.color == fieldValus });
                                            }
                                        }
                                        if (field == 'clarity') {
                                            let customLot = [];
                                            let custom = [];
                                            if (fieldValus.indexOf(',') != -1) {
                                                let values =  fieldValus.split(',');
                                                values.forEach((val)=>{
                                                    customLot = newLot.filter((item) => { return item.clarity == val });
                                                    if (customLot.length > 0) {
                                                        newLot = custom.concat(customLot);
                                                    }
                                                });
                                            }else{
                                                newLot = newLot.filter((item) => { return item.clarity == fieldValus });
                                            }
                                        }
                                    })
                                }
                            })
                        }
                    }
                    item.lotNumbers = newLot;
                    if (newLot.length == 0 ) {
                        data = data.filter((lot) => { return lot.reference != item.reference });
                    }
                }
            }
        });

        let maxPrice = 0;

        data.forEach(function(item){
            if (isViewAsSet) {
                allData.push({
                    'id': item.id, 'reference':item.reference, 'postedDate':item.postedDate, 'totalPrice':item.totalPrice, 'description':item.description,
                    'setReference':item.reference, 'totalNetAmount':item.totalNetAmount, 'totalNetAmount':item.totalNetAmount
                });
            }else{
                allData.push({
                    'id': item.id,'reference':item.reference,'postedDate':item.postedDate, 'netAmount':item.netAmount,'description':item.description,
                    'setReference':item.setReference
                });
            }
            if (item.setReference !== undefined && item.setReference !== '') {
                setReferences.push({'reference':item.setReference});
            }
            if(item.netAmount != undefined){
                if(item.netAmount[userCurrency] != undefined){
                    if(item.netAmount[userCurrency] != 0){
                        maxPrice = Math.max(maxPrice, item.netAmount[userCurrency]);
                    }else{
                        maxPrice = Math.max(maxPrice, 0);
                    }
                }else{
                    item.netAmount[userCurrency] = 0;
                    maxPrice = Math.max(maxPrice, 0);
                }
            }else{
                if (isViewAsSet) {
                    if(item.totalNetAmount['USD'] != undefined){
                        if(item.totalNetAmount['USD'] != 0){
                          maxPrice = Math.max(maxPrice, item.totalNetAmount['USD']);
                        }else{
                          maxPrice = Math.max(maxPrice, 0);
                        }
                    }else{
                        item.totalNetAmount['USD'] = 0;
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
            if(item.netAmount != undefined){
                if(item.netAmount[userCurrency] != undefined){
                    minPrice = Math.min(minPrice, item.netAmount[userCurrency]);
                }else{
                    minPrice = Math.min(minPrice, 0);
                }
            }else{
                if (isViewAsSet) {
                    if(item.totalNetAmount['USD'] != undefined){
                        minPrice = Math.min(minPrice, item.totalNetAmount['USD']);
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

        if (!isViewAsSet) {
            allData = allData.map((item) => {return {'id':item.id}})
        }

        exportData = data;
        let pageData = data.slice( (page - 1) * size, page * size );
        let sumPrice = 0;
        let sumCost = 0;
        let sumNetAmount = 0;
        let sumDisconst = 0;
        let sumMargin = 0;
        let sumDisconstPercent = 0;
        let sumMarginPercent = 0;

        if(pageData.length != 0){
            data.forEach(function(item){
                if (isViewAsSet) {
                    sumPriceData.push(item.totalPrice!=undefined? item.totalPrice['USD']!=undefined? item.totalPrice['USD']: 0: 0);
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
                    sumCostData.push(item.totalUpdatedCost!=undefined? item.totalUpdatedCost['USD']!=undefined? item.totalUpdatedCost['USD']: 0: 0);
                }else {
                    sumCostData.push(GetPriceCurrency(item,'updatedCost',userCurrency));
                }
            });

            sumCostData.forEach(function(cost) {
                sumCost = sumCost+Math.round(cost);
            });

            data.forEach(function(item){
                if (isViewAsSet) {
                    sumNetAmountData.push(item.totalNetAmount!=undefined? item.totalNetAmount['USD']!=undefined? item.totalNetAmount['USD']: 0: 0);
                }else {
                    sumNetAmountData.push(GetPriceCurrency(item,'netAmount',userCurrency));
                }
            });

            sumNetAmountData.forEach(function(price) {
                sumNetAmount = sumNetAmount+Math.round(price);
            });

            data.forEach(function(item){
                if (isViewAsSet) {
                    sumDisconstData.push(item.totalDiscountAmount!=undefined? item.totalDiscountAmount['USD']!=undefined? item.totalDiscountAmount['USD']: 0: 0);
                }else {
                    sumDisconstData.push(item.discountAmountUSD);
                }
            });

            sumDisconstData.forEach(function(price) {
                sumDisconst = sumDisconst+Math.round(price);
            });
            sumDisconstPercent = (sumDisconst/sumPrice)*100;

            data.forEach(function(item){
                if (isViewAsSet) {
                    sumMarginData.push(item.totalMargin != undefined? item.totalMargin['USD']!=undefined? item.totalMargin['USD']: 0: 0);
                }else {
                    sumMarginData.push(GetPriceCurrency(item,'margin',userCurrency));
                }
            });

            sumMarginData.forEach(function(price) {
                sumMargin = sumMargin+Math.round(price);
            });
            sumMarginPercent = (sumMargin/sumNetAmount)*100;
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
                'avrgPrice': avrgPrice,
                'netAmount': sumNetAmount,
                'disconst': sumDisconst,
                'margin': sumMargin,
                'sumDisconstPercent': sumDisconstPercent,
                'sumMarginPercent': sumMarginPercent
            }
        };
        return sendData;
    } catch (err) {
        console.log(err);
    }
}

const compareBy = (property, order = 'asc', userCurrency) => (a, b) => {
    console.log('property-->',property);
    console.log('order-->',order);
    console.log('userCurrency-->',userCurrency);
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
    console.log('property-->',property);
    console.log('order-->',order);
    console.log('userCurrency-->',userCurrency);
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
