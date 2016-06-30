import { FETCH_GEMATTRDETAIL,FETCH_PRODUCTRELETED} from '../../constants/productdetailconstants';
const INITIAL_STATE = {detail:'',relete:'',reletepage:1,productlist:null,index:1,indexplus:1};


export default function(state = INITIAL_STATE,action){
    switch (action.type) {

      case FETCH_GEMATTRDETAIL:
        return {...state,detail:action.data}
      case FETCH_PRODUCTRELETED:
        return {...state,relete:action.data,reletepage:action.page}
      default:
        return state;
    }
}
