import fetch from 'isomorphic-fetch';

import {
    ROOT_URL, FETCH_ALL_RELATED_ITEMS, SET_RELATEDITEM, ADD_RELATED_ITEMS, SET_RELATEDITEM_SOURCE, SET_RELATEDITEM_ID, FETCH_RELATED_ITEM_ID, 
    EDIT_RELATED_ITEM, DELETE_RELATED_ITEM, SET_RELATEDITEM_SELECTED, FETCH_EXPORT_RELATE_ITEMS
} from '../constants/relatedItemConstants';


export function getAllRelatedItem(params) {
    const { page, pageSize } = params
    const token = sessionStorage.token;
    const url = `${ROOT_URL}/api/relateditem?page=${page}&pageSize=${pageSize}`;
    return {
        type: FETCH_ALL_RELATED_ITEMS,
        promise: fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        }),
        size: pageSize
    }
}

export function getSomeRelatedItem(params) {
    const { page, pageSize, name, reference } = params
    const token = sessionStorage.token;
    const url = `${ROOT_URL}/api/relateditem/search?page=${page}&pageSize=${pageSize}&name=${name}&reference=${reference}`;
    return {
        type: FETCH_ALL_RELATED_ITEMS,
        promise: fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        }),
        size: pageSize
    }
}

export function getRelatedItemId(id) {
    const token = sessionStorage.token;
    const url = `${ROOT_URL}/api/relateditem/${id}`;
    return {
        type: FETCH_RELATED_ITEM_ID,
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

export function setRelatedItemId(value){
    return {
        type: SET_RELATEDITEM_ID,
        relatedItemId: value
    }
}

export function setRelatedItem(value){
    return {
        type: SET_RELATEDITEM,
        relatedItem: value
    }
}

export function setRelatedItemSource(value){
    return {
        type: SET_RELATEDITEM_SOURCE,
        relatedItemSource: value
    }
}

export function addedRelatedItem(params) {
    const { pageSize} = params
    const token = sessionStorage.token;
    const url = `${ROOT_URL}/api/relateditem`;
    return {
        type: ADD_RELATED_ITEMS,
        promise: fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(params)
        }),
        size: pageSize
    }
}

export function editRelatedItem(params) {
    const { pageSize} = params
    const token = sessionStorage.token;
    const url = `${ROOT_URL}/api/relateditem`;
    return {
        type: EDIT_RELATED_ITEM,
        promise: fetch(url,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(params)
        }),
        size: pageSize
    }
}

export function deleteRelatedItem(params){
    const { id, pageSize } = params
    const token = sessionStorage.token;
    const url = `${ROOT_URL}/api/relateditem/${id}`;
    return {
        type: DELETE_RELATED_ITEM,
        promise: fetch(url,{
            method: 'PUT',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        }),
        size: pageSize
    }
}

export function setRelatedItemSelected(value){
    return {
        type: SET_RELATEDITEM_SELECTED,
        relatedItemSelected: value
    }
}

export function exportRelateItem(params){
    const token = sessionStorage.token;
    const { page, pageSize } = params
    let url = `${ROOT_URL}/api/relateditem/exportexcel`;

    return {
        type: FETCH_EXPORT_RELATE_ITEMS,
        promise: fetch(url,{
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        }),
        currPage: page,
        size: pageSize
    }
}