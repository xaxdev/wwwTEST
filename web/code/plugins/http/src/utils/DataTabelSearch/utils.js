var sortBy = require('lodash.sortby');
var some = require('lodash.some');
import numberFormat from '../convertNumberformat';
import numberFormat2digit from '../convertNumberformatwithcomma2digit';

/**
 * @param {object} sortBy Object containing `prop` and `order`.
 * @param {array} data Array to sort.
 * @return {array} Sorted array.
 */
function sort(sortByValues, data) {
  // console.log('sortByValues -->',sortByValues);
  // console.log('data -->',data);
  // Convert string to number for sorting
  if(sortByValues.prop === 'priceUSD'){
    data.forEach(function(item){
      item.priceUSD = parseFloat(item.priceUSD.replace(/,/g, ''));
      // console.log('item.priceUSD-->',item.priceUSD);
    });
  }
  if(sortByValues.prop === 'jewelsWeight'){
    data.forEach(function(item){
      item.jewelsWeight = parseFloat(item.jewelsWeight);
      // console.log('item.priceUSD-->',item.priceUSD);
    });
  }
  if(sortByValues.prop === 'grossWeight'){
    data.forEach(function(item){
      item.grossWeight = parseFloat(item.grossWeight);
      // console.log('item.priceUSD-->',item.priceUSD);
    });
  }
  // sorting
  var sortedData = sortBy(data, sortByValues.prop);
  // console.log('sortedData -->',sortedData);
  if (sortByValues.order === 'descending') {
    sortedData.reverse();
  }
  
  // Convert number to string for show data
  if(sortByValues.prop === 'priceUSD'){
    data.forEach(function(item){
      item.priceUSD = numberFormat(item.priceUSD);
      // console.log('item.priceUSD-->',item.priceUSD);
    });
  }
  if(sortByValues.prop === 'jewelsWeight'){
    data.forEach(function(item){
      item.jewelsWeight = numberFormat2digit(item.jewelsWeight);
      // console.log('item.priceUSD-->',item.priceUSD);
    });
  }
  if(sortByValues.prop === 'grossWeight'){
    data.forEach(function(item){
      item.grossWeight = numberFormat2digit(item.grossWeight);
      // console.log('item.priceUSD-->',item.priceUSD);
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
    var filterDef = filters[key];
    var partial = filterDef.filter.bind(null, filterValue);
    if (!filterDef.prop) {
      // Filter is for all properties
      return some(data, function (each) {
        return partial(each);
      });
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
  var filterFunc = filterPass.bind(null, filters);
  return data.filter(function (each) {
    return some(filterValues, filterFunc(each));
  });
}

module.exports = { filter: filter, sort: sort };
