import  {
        GET_CATALOGITEMS, DELETE_ITEMSFROMCATALOG, SET_SLECTEDCATALOG, SET_NEWCATALOGNAME, DELETE_CATALOG
        } from '../../constants/itemconstants';

const INITIAL_STATE = { datas:null, listCatalogItems:[], currentPage: 1, catalogId: null, catalogName: null };

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case DELETE_CATALOG :
        //   console.log('action.data-->',action);
          return {...state, catalogId: action.catalogId };
        case SET_NEWCATALOGNAME :
        //   console.log('action.data-->',action);
          return {...state, catalogName: action.catalogName };
        case SET_SLECTEDCATALOG :
        //   console.log('action.data-->',action.data);
          return {...state, catalogId: action.catalog };
        case DELETE_ITEMSFROMCATALOG :
        //   console.log('action.data-->',action);
          return {...state, catalogId: action.catalog};
        case GET_CATALOGITEMS :
          // console.log('action.data-->',action.data);
          return {...state, listCatalogItems: action.data, currentPage: action.data.page, catalogId: action.catalog,
                    catalogName: action.data.catalog
                };
        default:
            return {...state};
    }
}
