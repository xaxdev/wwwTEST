import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import { FETCH_PRODUCTDETAIL,FETCH_PRODUCTRELETED,ROOT_URL} from '../constants/productdetailconstants';
// const fakeApiurl = 'http://localhost:4500/jewelry/';

export function getProductDetail(productId,productlist){

  return {
          type: FETCH_PRODUCTDETAIL,
    		  promise: fetch(`${ROOT_URL}api/items/${productId}`,{
          method: 'GET'
        }),
        productid:productId,
        productlist:productlist
  }
}

export function getProductRelete(collection,page){
  return {
      type: FETCH_PRODUCTRELETED,
      promise: fetch( `${ROOT_URL}api/items/relateditems/${collection}/${page}`,{
        method:'GET'
      }),
      page:page
  }
}
