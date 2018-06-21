import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import {
    FETCH_PRODUCTDETAIL,FETCH_PRODUCTRELETED,ROOT_URL,FETCH_SETREFERENCE,GET_CATALOGNAME,ADD_CATALOG,GET_CERTIFICATE,
    GET_LOTNUMBER,GET_LOTNUMBERPAGE, GET_MOVEMENT,FETCH_SETDETAILS,FETCH_ALLITEMS,ADD_NEWSETCATALOGITEM,GET_SETCATALOGNAME,
    GET_SETCATALOGITEMSLIST, FETCH_SETCATALOGDETAILS, FETCH_SALESPRODUCTDETAIL, FETCH_SALESPRODUCTRELETED, FETCH_SALESSETDETAILS
} from '../constants/productdetailconstants';

export function getItems(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}api/items/search`;

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
        currPage: params.page
    }
}
export function getCatalogNameSetItem(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}api/catalog/webnamessetitem`;

    return {
        type: GET_CATALOGNAME,
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
export function getSetCatalogName(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}api/catalog/webnamessetcatalog`;

    return {
        type: GET_SETCATALOGNAME,
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
export function addCatalogSetItem(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}api/catalog/setitem`;
    return {
        type: ADD_CATALOG,
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
export function getSetDetails(setReferenceId, setReferencelist){
    const token = sessionStorage.token;
    return {
        type: FETCH_SETDETAILS,
        promise: fetch(`${ROOT_URL}api/items/setdetails/${setReferenceId}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }),
        productid:setReferenceId.replace('-','/'),
        productlist:setReferencelist
    }
}
export function getSalesSetDetails(setReferenceId, setReferencelist){
    const token = sessionStorage.token;
    return {
        type: FETCH_SALESSETDETAILS,
        promise: fetch(`${ROOT_URL}api/items/salessetdetails/${setReferenceId}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }),
        productid:setReferenceId.replace('-','/'),
        productlist:setReferencelist
    }
}
export function getSetCatalogDetails(setReferenceId, setReferencelist){
    const token = sessionStorage.token;
    return {
        type: FETCH_SETCATALOGDETAILS,
        promise: fetch(`${ROOT_URL}api/items/setdetails/${setReferenceId}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }),
        productid:setReferenceId.replace('-','/'),
        productlist:setReferencelist
    }
}
export function getSetCatalogItemsWithSetItem(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}api/catalog/setcatalogitem/${params.id}?page=${params.page}&size=${params.size}&sort=${params.sort}&order=${params.order}`;
    return {
        type: GET_SETCATALOGITEMSLIST,
        promise: fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }),
        setReferenceId: params.setReferenceId
    }
}
export function getMovement(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}api/items/movement`;
    return {
        type: GET_MOVEMENT,
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

export function getLotNaumberPerPage(params){
    return {
        type: GET_LOTNUMBERPAGE,
        datas: params.datas,
        page: params.page,
        size: params.size
    }
}

export function getLotNaumber(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}api/items/lotnumber`;
    return {
        type: GET_LOTNUMBER,
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

export function getCertificate(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}api/items/certificate/${params.productId}`;
    return {
        type: GET_CERTIFICATE,
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

export function getProductDetail(productId,productlist){
    const token = sessionStorage.token;
    return {
        type: FETCH_PRODUCTDETAIL,
        promise: fetch(`${ROOT_URL}api/items/${productId}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        }),
        productid:productId,
        productlist:productlist
    }
}

export function getSalesProductDetail(productId,productlist){
    const token = sessionStorage.token;
    return {
        type: FETCH_SALESPRODUCTDETAIL,
        promise: fetch(`${ROOT_URL}api/items/salesitem/${productId}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        }),
        productid:productId,
        productlist:productlist
    }
}

export function getProductRelete(collection,page,productId,dominant,currency,price){
    const token = sessionStorage.token;
    return {
        type: FETCH_PRODUCTRELETED,
        promise: fetch( `${ROOT_URL}api/items/relateditems/${collection}/${page}/${productId}/${dominant}/${currency}/${price}`,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            method:'GET'
        }),
        page:page
    }
}

export function getSalesProductRelete(collection,page,productId,dominant,currency,price){
    const token = sessionStorage.token;
    return {
        type: FETCH_SALESPRODUCTRELETED,
        promise: fetch( `${ROOT_URL}api/items/salesrelateditems/${collection}/${page}/${productId}/${dominant}/${currency}/${price}`,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            method:'GET'
        }),
        page:page
    }
}

export function getSetreference(setreference,productId){
    const token = sessionStorage.token;
    return {
        type: FETCH_SETREFERENCE,
        promise: fetch( `${ROOT_URL}api/items/setreference/${encodeURIComponent(setreference)}/${productId}`,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            method:'GET'
        })
    }
}

export function getCatalogName(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}api/catalog/names`;

    return {
        type: GET_CATALOGNAME,
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

export function addCatalog(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}api/catalog`;
    return {
        type: ADD_CATALOG,
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

export function addNewSetCatalogItem(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}api/catalog/setcatalogitem`;
    return {
        type: ADD_NEWSETCATALOGITEM,
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
