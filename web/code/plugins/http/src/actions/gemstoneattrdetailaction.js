import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import { FETCH_PRODUCTDETAIL,FETCH_PRODUCTRELETED,ROOT_URL,FETCH_SETREFERENCE} from '../constants/productdetailconstants';

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

export function getProductRelete(collection,page,productId){
  return {
      type: FETCH_PRODUCTRELETED,
      promise: fetch( `${ROOT_URL}api/items/relateditems/${collection}/${page}/${productId}`,{
        method:'GET'
      }),
      page:page
  }
}
export function getSetreference(setreference,productId){
  return {
      type: FETCH_SETREFERENCE,
      promise: fetch( `${ROOT_URL}api/items/setreference/${encodeURIComponent(setreference)}/${productId}`,{
        method:'GET'
      })
  }
}
