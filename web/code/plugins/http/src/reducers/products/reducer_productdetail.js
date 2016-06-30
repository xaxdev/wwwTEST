import { FETCH_PRODUCTDETAIL,FETCH_PRODUCTRELETED} from '../../constants/productdetailconstants';
const INITIAL_STATE = {detail:'',relete:'',reletepage:1,productlist:null,index:1,indexplus:1,pagego:1};


export default function(state = INITIAL_STATE,action){
    switch (action.type) {

      case FETCH_PRODUCTDETAIL:
        return {...state,detail:action.data,index:action.productlist?findproductindex(action.productlist,action.productid):0
          ,indexplus:action.productlist?findproductindexplus(action.productlist,action.productid):0
          ,pagego:action.productlist?findproductindexplus(action.productlist,action.productid):0,productlist:action.productlist}
      case FETCH_PRODUCTRELETED:
        return {...state,relete:action.data,reletepage:action.page}
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
