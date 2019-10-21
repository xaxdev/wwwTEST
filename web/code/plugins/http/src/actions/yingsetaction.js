import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import {
    ROOT_URL, FETCH_ALLNAME, ADD_YINGCATALOGNAME, FETCH_YINGCATALOGDETAIL, FETCH_ITEMDETAIL, SET_ITEMSLIST, SET_YINGDELETEDITEM, SET_YINGEDITITEMREFERENCE,
    SET_YINGSETDETAILADDRESS, SET_YINGSETDETAILREMARK, ADD_YINGCATALOGDETAIL, UPLOAD_SETIMAGE, SET_YINGSETIMAGEBASE64, UPDATE_YINGCATALOGDETAIL, 
    GET_YINGSETREFERENCE, SET_CHANGEDORDERSETREFERENCE, UPDATE_ORDERSETREFERENCE, DELETE_CATALOGNAME, FETCH_SOMENAME, SET_SHAREDYINGSET, DELETE_YINGSET,
    SET_EDITITEMDETAILS, FETCH_ALLPDF, FETCH_EXCELFILE
} from '../constants/yingConstants';

export function getYingName(params){
    const token = sessionStorage.token;
    const { page, pageSize } = params
    let url = `${ROOT_URL}/api/catalog/yingcatalog/name?page=${page}&pageSize=${pageSize}`;

    return {
        type: FETCH_ALLNAME,
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

export function addYingName(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/catalog/yingcatalog/name`;

    return {
        type: ADD_YINGCATALOGNAME,
        promise: fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(params)
        })
    }
}

export function getYingDetail(params){
    const token = sessionStorage.token;
    const { page, pageSize, id } = params
    let url = `${ROOT_URL}/api/catalog/yingcatalog/detail/${id}?page=${page}&pageSize=${pageSize}`;

    return {
        type: FETCH_YINGCATALOGDETAIL,
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

export function addYingDetail(params){
    const token = sessionStorage.token;
    const { id } = params
    let url = `${ROOT_URL}/api/catalog/yingcatalog/detail/${id}`;

    return {
        type: ADD_YINGCATALOGDETAIL,
        promise: fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(params)
        })
    }
}

export function getItemDetail(params){
    const { reference } = params;
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/catalog/yingcatalog/item/${reference.replace('/','-')}`;
    return {
        type: FETCH_ITEMDETAIL,
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

export function setItemList(value){
    return {
        type: SET_ITEMSLIST,
        listItem: value
    }
}

export function setYingDeletedItem(value){
    return {
        type: SET_YINGDELETEDITEM,
        isDeletedItem: value
    }
}

export function setYingEditItemReference(value){
    return {
        type: SET_YINGEDITITEMREFERENCE,
        editItemReference: value
    }
}

export function setYingSetDetailAddress(value){
    return {
        type: SET_YINGSETDETAILADDRESS,
        setDetailAddress: value
    }
}

export function setYingSetDetailRemark(value){
    return {
        type: SET_YINGSETDETAILREMARK,
        setDetailRemark: value
    }
}

export function setYingSetImageBase64(value){
    return {
        type: SET_YINGSETIMAGEBASE64,
        setImageBase64: value
    }
}

export function uploadSetImage(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/catalog/yingcatalog/upload/setimage`;
    return {
        type: UPLOAD_SETIMAGE,
        promise: fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(params)
        })
    }
}

export function updateYingDetail(params){
    const token = sessionStorage.token;
    const { id } = params
    let url = `${ROOT_URL}/api/catalog/yingcatalog/detail/${id}`;

    return {
        type: UPDATE_YINGCATALOGDETAIL,
        promise: fetch(url,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(params)
        })
    }
}

export function getYingSetReference(params){
    const token = sessionStorage.token;
    const { id } = params
    let url = `${ROOT_URL}/api/catalog/yingcatalog/setreference/${id}`;

    return {
        type: GET_YINGSETREFERENCE,
        promise: fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
    }
}

export function changedOrderSetReference(value){
    return {
        type: SET_CHANGEDORDERSETREFERENCE,
        changedOrder: value
    }
}

export function updateOrderSetReference(params){
    const token = sessionStorage.token;
    const { id } = params
    let url = `${ROOT_URL}/api/catalog/yingcatalog/setreference/${id}`;

    return {
        type: UPDATE_ORDERSETREFERENCE,
        promise: fetch(url,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(params)
        })
    }
}

export function deleteYingCatalogName(params){
    const token = sessionStorage.token;
    const { id } = params
    let url = `${ROOT_URL}/api/catalog/yingcatalog/${id}`;

    return {
        type: DELETE_CATALOGNAME,
        promise: fetch(url,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(params)
        })
    }
}

export function getSomeYingCatalogName(params){
    const token = sessionStorage.token;
    const { page, pageSize, name } = params
    let url = `${ROOT_URL}/api/catalog/yingcatalog/somename?name=${name}&page=${page}&pageSize=${pageSize}`;

    return {
        type: FETCH_SOMENAME,
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

export function shareYingSet(params) {
    const token = sessionStorage.token;
    const url = `${ROOT_URL}/api/catalog/yingcatalog/share`;
    return {
        type: SET_SHAREDYINGSET,
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

export function deleteYingSet(params){
    const token = sessionStorage.token;
    const { id } = params
    let url = `${ROOT_URL}/api/catalog/yingcatalog/set/${id}`;

    return {
        type: DELETE_YINGSET,
        promise: fetch(url,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(params)
        })
    }
}

export function setEditItemDetails(value){
    return {
        type: SET_EDITITEMDETAILS,
        isEditItemDetails: value
    }
}

export function getAllPDF(id, lng){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/catalog/yingcatalog/getallpdf/${id}/${lng}`;

    return {
        type: FETCH_ALLPDF,
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

export function getExcel(id){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/catalog/yingcatalog/getexcel/${id}`;

    return {
        type: FETCH_EXCELFILE,
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