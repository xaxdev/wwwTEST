// import OPTIONS_DATA from '../utils/options';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import { FETCH_OPTIONS, SELECTED_COMPANY, SELECTED_WAREHOUSES, ROOT_URL, GED_ONHANDWAREHOUSES } from '../constants/masterDataConstants.js';

export function get(){
  // console.log('action get data-->',OPTIONS_DATA);
  const token = sessionStorage.token;
  var url = `${ROOT_URL}/api/masterdata`;

  return {
          type: FETCH_OPTIONS,
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

export function getSite(compid){
  // console.log('compid-->',compid);
  const token = sessionStorage.token;
  var url = `${ROOT_URL}/api/masterdata`;

  return {
          type: SELECTED_COMPANY,
    		  promise: fetch(url,{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': token
            },
          }),
          selected: compid
  }
}

export function getWarehouse(props){

  const { siteid, comid, options } = props;

  // console.log('siteid-->',siteid);
  // console.log('comid-->',comid);

  const token = sessionStorage.token;
  var url = `${ROOT_URL}/api/masterdata`;

  return {
          type: SELECTED_WAREHOUSES,
    		  promise: fetch(url,{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': token
            },
          }),
          selected: siteid,
          comid: comid
  }
}

export function getOnHandWarehouse(locations) {
  const token = sessionStorage.token;
  var url = `${ROOT_URL}/api/masterdata`;

  return {
          type: GED_ONHANDWAREHOUSES,
    		  promise: fetch(url,{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': token
            },
          }),
          location: locations
  }
}
