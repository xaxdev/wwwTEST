import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import {
    ROOT_URL, POST_SAVESEARCH, GET_LISTSAVESEARCH, SET_SHAREDSAVESEARCH, SET_CLOSEALERTMSG, GET_SAVECRITERIA, SET_PARAMS, DELETE_SAVESEARCH, SET_SALESPARAMS,
    SET_IDDELETESAVESEARCH, SET_IDEDITSAVESEARCH, SET_SALESSHAREDSAVESEARCH, SET_IDDELETESALESSAVESEARCH, DELETE_SALESSAVESEARCH, GET_SALESSAVECRITERIA,
    SET_IDEDITSALESSAVESEARCH
} from '../constants/itemconstants';

export function setIdEditSaveSearch(params) {
    const token = sessionStorage.token;
    return {
        type: SET_IDEDITSAVESEARCH,
        params: params
    }
}
export function setIdEditSalesSaveSearch(params) {
    const token = sessionStorage.token;
    return {
        type: SET_IDEDITSALESSAVESEARCH,
        params: params
    }
}
export function setIdDeleteSaveSearch(id) {
    const token = sessionStorage.token;
    return {
        type: SET_IDDELETESAVESEARCH,
        id: id
    }
}
export function setIdDeleteSalesSaveSearch(id) {
    const token = sessionStorage.token;
    return {
        type: SET_IDDELETESALESSAVESEARCH,
        id: id
    }
}
export function deleteSaveSearch(params) {
    const token = sessionStorage.token;
    const url = `${ROOT_URL}/api/items/search/remove`;
    return {
        type: DELETE_SAVESEARCH,
        promise: fetch(url,{
            method: 'DELETE',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
    }
}
export function deleteSalesSaveSearch(params) {
    const token = sessionStorage.token;
    const url = `${ROOT_URL}/api/items/salessearch/remove`;
    return {
        type: DELETE_SALESSAVESEARCH,
        promise: fetch(url,{
            method: 'DELETE',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
    }
}
export function setParams(params){
    const token = sessionStorage.token;
    return {
        type: SET_PARAMS,
        params: params
    }
}
export function setSalesParams(params){
    const token = sessionStorage.token;
    return {
        type: SET_SALESPARAMS,
        params: params
    }
}
export function getSaveCriteria(params) {
    const token = sessionStorage.token;
    const url = `${ROOT_URL}/api/items/search/view/${params.id}`;
    return {
        type: GET_SAVECRITERIA,
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
export function getSalesSaveCriteria(params) {
    const token = sessionStorage.token;
    const url = `${ROOT_URL}/api/items/salessearch/view/${params.id}`;
    return {
        type: GET_SALESSAVECRITERIA,
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
export function shareSaveSearch(params) {
    const token = sessionStorage.token;
    const url = `${ROOT_URL}/api/items/search/share`;
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

export function shareSalesSaveSearch(params) {
    const token = sessionStorage.token;
    const url = `${ROOT_URL}/api/items/salessearch/share`;
    return {
        type: SET_SALESSHAREDSAVESEARCH,
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

export function getListsSaveSearch(params) {
    const token = sessionStorage.token;
    const url = `${ROOT_URL}/api/items/search/list`;
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

export function saveSearchCriteria(params) {
    const token = sessionStorage.token;
    const url = `${ROOT_URL}/api/items/search/save`;
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

export function setCloseAlertMsg(value) {
    return {
        type: SET_CLOSEALERTMSG,
        closeAlertMsg: value
    }
}
