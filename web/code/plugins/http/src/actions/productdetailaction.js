import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import { FETCH_PRODUCTDETAIL,FETCH_PRODUCTRELETED,ROOT_URL,FETCH_SETREFERENCE} from '../constants/productdetailconstants';
import { GET_CATALOGNAME} from '../constants/itemconstants';
// const fakeApiurl = 'http://localhost:4500/jewelry/';

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
  // console.log('getItems-->',url);

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
