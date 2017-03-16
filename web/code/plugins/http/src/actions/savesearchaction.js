import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import { ROOT_URL, POST_SAVESEARCH, GET_LISTSAVESEARCH, SET_SHAREDSAVESEARCH,
        SET_CLOSEALERTMSG } from '../constants/itemconstants';

export function shareSaveSearch(params){
  const token = sessionStorage.token;
  var url = `${ROOT_URL}/api/items/search/share`;
  // console.log('getListsSaveSearch-->',url);
  return {
            type: SET_SHAREDSAVESEARCH,
            promise: fetch(url,{
                        method: 'POST',
                        body: JSON.stringify(params),
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': token
                        },
                    })
  }
}

export function getListsSaveSearch(params){
  const token = sessionStorage.token;
  var url = `${ROOT_URL}/api/items/search/list`;
  // console.log('getListsSaveSearch-->',url);
  return {
            type: GET_LISTSAVESEARCH,
            promise: fetch(url,{
                        method: 'GET',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': token
                        },
                    })
  }
}

export function saveSearchCriteria(params){
  const token = sessionStorage.token;
  var url = `${ROOT_URL}/api/items/search/save`;
  // console.log('getItems-->',url);
  return {
          type: POST_SAVESEARCH,
    		promise: fetch(url,{
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': token
            },
          })
  }
}

export function setCloseAlertMsg(value){
    return {
            type: SET_CLOSEALERTMSG,
            closeAlertMsg:value
    }
}
