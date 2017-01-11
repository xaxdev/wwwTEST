import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import { FETCH_PRODUCTDETAIL,FETCH_PRODUCTRELETED,ROOT_URL,FETCH_SETREFERENCE,GET_CATALOGNAME,
        ADD_CATALOG,GET_CERTIFICATE} from '../constants/productdetailconstants';
// const fakeApiurl = 'http://localhost:4500/jewelry/';

export function getCertificate(params){
  const token = sessionStorage.token;
  var url = `${ROOT_URL}api/items/certificate/${params.productId}`;
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
  var url = `${ROOT_URL}api/catalog/names`;

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
  var url = `${ROOT_URL}api/catalog`;
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
