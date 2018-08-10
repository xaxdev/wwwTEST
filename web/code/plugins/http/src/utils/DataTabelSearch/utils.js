const sortBy = require('lodash.sortby');
const some = require('lodash.some');
import numberFormat from '../convertNumberformat';
import numberFormat2digit from '../convertNumberformatwithcomma2digit';

/**
 * @param {object} sortBy Object containing `prop` and `order`.
 * @param {array} data Array to sort.
 * @return {array} Sorted array.
 */
function sort(sortByValues, data) {
    if(sortByValues.prop === 'netAmountUSD'){
        data.forEach(function(item){
            if(item.netAmountUSD.indexOf(',') != -1){
                item.netAmountUSD = parseFloat(item.netAmountUSD.replace(/,/g, ''));
            }else if(item.netAmountUSD.indexOf('-') != -1){
                item.netAmountUSD = parseFloat(item.netAmountUSD.replace(/-/g, 0));
            }else{
                item.netAmountUSD = parseFloat(item.netAmountUSD);
            }
        });
    }
    if(sortByValues.prop === 'priceUSD'){
        data.forEach(function(item){
            if(item.priceUSD.indexOf(',') != -1){
                item.priceUSD = parseFloat(item.priceUSD.replace(/,/g, ''));
            }else if(item.priceUSD.indexOf('-') != -1){
                item.priceUSD = parseFloat(item.priceUSD.replace(/-/g, 0));
            }else{
                item.priceUSD = parseFloat(item.priceUSD);
            }
        });
    }
    if(sortByValues.prop === 'jewelsWeight'){
        data.forEach(function(item){
            if(item.jewelsWeight.indexOf(',') != -1){
                item.jewelsWeight = parseFloat(item.jewelsWeight.replace(/,/g, ''));
            }else if(item.jewelsWeight.indexOf('-') != -1){
                item.jewelsWeight = parseFloat(item.jewelsWeight.replace(/-/g, 0));
            }else{
                item.jewelsWeight = parseFloat(item.jewelsWeight);
            }
        });
    }
    if(sortByValues.prop === 'grossWeight'){
        data.forEach(function(item){
            if(item.grossWeight.indexOf(',') != -1){
                item.grossWeight = parseFloat(item.grossWeight.replace(/,/g, ''));
            }else if(item.grossWeight.indexOf('-') != -1){
                item.grossWeight = parseFloat(item.grossWeight.replace(/-/g, 0));
            }else{
                item.grossWeight = parseFloat(item.grossWeight);
            }
        });
    }
    // sorting
    let sortedData = sortBy(data, sortByValues.prop);

    if (sortByValues.order === 'descending') {
        sortedData.reverse();
    }
    // Convert number to string for show data
    if(sortByValues.prop === 'netAmountUSD'){
        sortedData.forEach(function(item){
            item.netAmountUSD = numberFormat(item.netAmountUSD);
        });
    }
    if(sortByValues.prop === 'priceUSD'){
        sortedData.forEach(function(item){
            item.priceUSD = numberFormat(item.priceUSD);
        });
    }
    if(sortByValues.prop === 'jewelsWeight'){
        sortedData = sortedData.sort(compareBy(sortByValues.prop,sortByValues.order === 'descending'?'desc':'asc'));
        sortedData.forEach(function(item){
            item.jewelsWeight = numberFormat2digit(parseFloat(item.jewelsWeight));
        });
    }
    if(sortByValues.prop === 'grossWeight'){
        sortedData = sortedData.sort(compareBy(sortByValues.prop,sortByValues.order === 'descending'?'desc':'asc'));
        sortedData.forEach(function(item){
            item.grossWeight = numberFormat2digit(parseFloat(item.grossWeight));
        });
    }
    return sortedData;
}

/**
 * @param {!object} filters
 * @param {!array} data
 * @return {function(*, string)} Function to be executed for each entry in data.
 */
function filterPass(filters, data) {
    return function (filterValue, key) {
        const filterDef = filters[key];
        const partial = filterDef.filter.bind(null, filterValue);
        if (!filterDef.prop) {
            // Filter is for all properties
            return some(data, function (each) { return partial(each) });
        } else {
            // Filter is for one property
            return partial(data[filterDef.prop]);
        }
    };
}

/**
 * Example of filter and filterValues.
 * filters = { globalSearch: { filter: containsIgnoreCase } }
 * filterValues = { globalSearch: 'filter value' }
 *
 * @param {object} filters Definition of the filters.
 * @param {object} filterValues Values of the filters.
 * @param {array} data Array to filter.
 * @return {array} Filtered array.
 */
function filter(filters, filterValues, data) {
    const filterFunc = filterPass.bind(null, filters);
    return data.filter(function (each) {
        return some(filterValues, filterFunc(each));
    });
}

const compareBy = (property, order = 'asc') => (a, b) => {
    if(!a.hasOwnProperty(property) || !b.hasOwnProperty(property)) {
        return 0;
    }
    let priceA = 0;
    let priceB = 0;
    const first = (property.toLowerCase().indexOf('price') != -1 || property.toLowerCase().indexOf('netamount') != -1)
                    ? a[property] != undefined
                        ? a[property] != undefined ? a[property] : 0
                        : 0
                    : a[property]
    const second = (property.toLowerCase().indexOf('price') != -1 || property.toLowerCase().indexOf('netamount') != -1)
                    ? b[property] != undefined
                        ? b[property] != undefined ? b[property] : 0
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

module.exports = { filter: filter, sort: sort };
