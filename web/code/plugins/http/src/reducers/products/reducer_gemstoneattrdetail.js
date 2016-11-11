import { FETCH_GEMATTRDETAIL,FETCH_PRODUCTRELETED,FETCH_SETREFERENCE,ADD_CATALOG,ADD_CATALOG_SUCCESS} from '../../constants/productdetailconstants';
const INITIAL_STATE = {detail:'',relete:'',reletepage:1,productlist:null,index:1,indexplus:1,setreference:''};


export default function(state = INITIAL_STATE,action){
    switch (action.type) {

      case FETCH_GEMATTRDETAIL:
        return {...state,detail:action.data}
      case FETCH_PRODUCTRELETED:
        return {...state,relete:action.data,reletepage:action.page}
      case ADD_CATALOG:
        return {...state,message: action.data.statusCode >= 400? action.data.message: ADD_CATALOG_SUCCESS}
      case FETCH_SETREFERENCE:
        return {...state,setreference:action.data}
      default:
        return state;
    }
}
