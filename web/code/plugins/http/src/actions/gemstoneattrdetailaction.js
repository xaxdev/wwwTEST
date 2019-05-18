import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import {
    FETCH_PRODUCTDETAIL,FETCH_PRODUCTRELETED,ROOT_URL,FETCH_SETREFERENCE,GET_CATALOGNAME, ADD_CATALOG, GET_CERTIFICATE, FETCH_SALESPRODUCTDETAIL,
    FETCH_SALESVIEWASSETPRODUCTDETAIL, FETCH_SALESPRODUCTRELETED
} from '../constants/productdetailconstants';

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
export function getCertificate(params){
    const token = sessionStorage.token;
    const url = `${ROOT_URL}api/items/certificate/${params.productId}`;
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
export function getSalesProductDetail(productId,productlist,params){
    const token = sessionStorage.token;
    return {
        type: FETCH_SALESPRODUCTDETAIL,
        promise: fetch(`${ROOT_URL}api/items/salesitem/${productId}`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(params)
        }),
        productid:productId,
        productlist:productlist
    }
}
export function getSalesViewAsSetProductDetail(productId,productlist){
    const token = sessionStorage.token;
    return {
        type: FETCH_SALESVIEWASSETPRODUCTDETAIL,
        promise: fetch(`${ROOT_URL}api/items/salesviewassetitem/${productId}`,{
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
export function getCatalogNameSetItem(params){
    const token = sessionStorage.token;
    const url = `${ROOT_URL}api/catalog/webnamessetitem`;

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
export function getProductDetail(productId,productlist){
    const token = sessionStorage.token;
    return {
        type: FETCH_PRODUCTDETAIL,
        promise: fetch(`${ROOT_URL}api/items/${productId}`,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            method: 'GET'
        }),
        productid:productId,
        productlist:productlist
    }
}

// export function getProductRelete(collection,page,productId,dominant,currency,price){
//     const token = sessionStorage.token;
//     return {
//         type: FETCH_PRODUCTRELETED,
//         promise: fetch( `${ROOT_URL}api/items/relateditems/${collection}/${page}/${productId}/${dominant}/${currency}/${price}`,{
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 'Authorization': token
//             },
//             method:'GET'
//         }),
//         page:page
//     }
// }

export function getProductRelete(reference,page){    
    const token = sessionStorage.token;
    return {
        type: FETCH_PRODUCTRELETED,
        promise: fetch( `${ROOT_URL}api/items/relateditems/${reference.replace('/','|')}/${page}`,{
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
    const url = `${ROOT_URL}api/catalog/names`;

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
    const url = `${ROOT_URL}api/catalog`;
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
