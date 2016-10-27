import { FETCH_PRODUCTDETAIL,FETCH_PRODUCTRELETED,FETCH_SETREFERENCE,ADD_CATALOG,ADD_CATALOG_SUCCESS} from '../../constants/productdetailconstants';
import { GET_CATALOGNAME} from '../../constants/itemconstants';
const INITIAL_STATE = {detail:'',relete:'',reletepage:1,productlist:null,index:1,indexplus:1,pagego:1,setreference:'',ListCatalogName: []};


export default function(state = INITIAL_STATE,action){
    switch (action.type) {

      case FETCH_PRODUCTDETAIL:

        return {...state,detail:action.data,index:action.productlist?findproductindex(action.productlist,action.productid):0
          ,indexplus:action.productlist?findproductindexplus(action.productlist,action.productid):0
          ,pagego:action.productlist?findproductindexplus(action.productlist,action.productid):0,productlist:action.productlist}
      case FETCH_PRODUCTRELETED:
        return {...state,relete:action.data,reletepage:action.page}
      case ADD_CATALOG:
        return {...state,message: action.data.statusCode >= 400? action.data.message: ADD_CATALOG_SUCCESS}
      case FETCH_SETREFERENCE:
        return {...state,setreference:action.data}
      case GET_CATALOGNAME :
        return {...state, ListCatalogName: action.data };
      default:
        return state;
    }
}

const findproductindex = (productlist, productid) => {

    for(let i = 0; i < productlist.length; i++)
    {
       if(productlist[i].id == productid){
         return i
       }
    }
}
const findproductindexplus = (productlist, productid) => {
    for(let i = 0; i < productlist.length; i++)
    {
       if(productlist[i].id == productid){
         return i+1
       }
    }
}
