import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import { FETCH_ALLITEMS, FETCH_ITEM, ROOT_URL, FETCH_SORTING, NEWSEARCH, MODIFY_SEARCH, SET_PARAMS,
  SET_CURRENTPAGE} from '../constants/itemconstants';
import urlCurrPage from '../utils/getUrlApiCurrPage';

export function getItems(params){
  const token = sessionStorage.token;
  var url = `${ROOT_URL}/api/items/search`;
  // console.log('getItems-->',url);

  return {
          type: FETCH_ALLITEMS,
    		  promise: fetch(url,{
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': token
            },
          }),
          currPage:params.page
  }
}

export function exportDatas(params){
  const token = sessionStorage.token;
  var url = `${ROOT_URL}/api/items/export`;
  // console.log('getItems-->',url);

  return {
          type: FETCH_ALLITEMS,
    		  promise: fetch(url,{
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': token
            },
          }),
          currPage:params.page
  }
}

export function sortBy(data,sortBy,sortDirections){
  const token = sessionStorage.token;
  return {
          type: FETCH_SORTING,
    		  sortBy:sortBy,
          sortDirections:sortDirections,
          data:data
  }
}

export function newSearch(){
  const token = sessionStorage.token;
  return {
          type: NEWSEARCH
  }
}
export function modifySearch(paramsSearch){
  const token = sessionStorage.token;
  return {
          type: MODIFY_SEARCH,
          params:paramsSearch
  }
}
export function setParams(params){
  const token = sessionStorage.token;
  return {
          type: SET_PARAMS,
          params:params
  }
}
export function setCurrentPage(value){
  return {
          type: SET_CURRENTPAGE,
          currentPage:value
  }
}
