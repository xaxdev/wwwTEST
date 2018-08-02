// import OPTIONS_DATA from '../utils/options';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import {
    FETCH_OPTIONS, SELECTED_COMPANY, SELECTED_WAREHOUSES, ROOT_URL,GET_ONHANDWAREHOUSES, SET_HIERARCHY, SET_NOTUSEHIERARCHY, GET_SALESWAREHOUSES,
    SET_SALESHIERARCHY, SET_NOTUSESALESHIERARCHY
} from '../constants/masterDataConstants.js';

export function get(){
    const token = sessionStorage.token;
    const url = `${ROOT_URL}/api/masterdata`;

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
export function getSold(){
    const token = sessionStorage.token;
    const url = `${ROOT_URL}/api/masterdata/soldmasterdata`;

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
export function setNotUseHierarchy(value){
    return {
        type: SET_NOTUSEHIERARCHY,
        notUseHierarchy:value
    }
}
export function setHierarchy(value){
    return {
        type: SET_HIERARCHY,
        hierarchy:value
    }
}
export function setNotUseSalesHierarchy(value){
    return {
        type: SET_NOTUSESALESHIERARCHY,
        notUseSalesHierarchy:value
    }
}
export function setSalesHierarchy(value){
    return {
        type: SET_SALESHIERARCHY,
        salesHierarchy:value
    }
}
export function getSite(compid){
    const token = sessionStorage.token;
    const url = `${ROOT_URL}/api/masterdata`;

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
    const token = sessionStorage.token;
    const url = `${ROOT_URL}/api/masterdata`;
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
    const url = `${ROOT_URL}/api/masterdata`;
    return {
        type: GET_ONHANDWAREHOUSES,
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

export function getSalesWarehouse(locations) {
    const token = sessionStorage.token;
    const url = `${ROOT_URL}/api/masterdata/soldmasterdata`;
    return {
        type: GET_SALESWAREHOUSES,
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
