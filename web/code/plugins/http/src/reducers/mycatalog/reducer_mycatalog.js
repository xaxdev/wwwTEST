import  {
        GET_CATALOGITEMS
        } from '../../constants/itemconstants';

const INITIAL_STATE = { datas:null, listCatalogItems:[], currentPage: 1 };

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case GET_CATALOGITEMS :
          // console.log('action.data-->',action.data);
          return {...state, listCatalogItems: action.data, currentPage: action.data.page, };
        default:
            return {...state};
    }
}
