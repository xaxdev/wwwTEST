import  {
        GET_CATALOGITEMS, DELETE_ITEMSFROMCATALOG, SET_SLECTEDCATALOG, SET_NEWCATALOGNAME, DELETE_CATALOG,
        GET_CATALOGNAME, SET_CATALOGSORTBY, SET_CATALOGSORTDIRECTION, SET_CATALOGCURRENTPAGE
        } from '../../constants/itemconstants';

const INITIAL_STATE = { datas:null, ListCatalogName: [], listCatalogItems:[], currentPage: 1, catalogId: null,
                        catalogName: null, catalogSortingBy:2, catalogSortDirection:-1
                        };

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case SET_CATALOGCURRENTPAGE :
          // console.log('SET_SORTBY -->',action.sortingBy);
          return {...state, currentPage: action.currentPage };
        case SET_CATALOGSORTBY :
          // console.log('SET_SORTBY -->',action.sortingBy);
          return {...state, catalogSortingBy: action.sortingBy };
        case SET_CATALOGSORTDIRECTION :
          // console.log('SET_PAGESIZE -->',action.pageSize);
          return {...state, catalogSortDirection: action.sortDirection };
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
        case GET_CATALOGNAME :
          // console.log('action.data-->',action.data);
          return {...state, ListCatalogName: action.data };
        case GET_CATALOGITEMS :
          // console.log('action.data-->',action.data);
          return {...state, listCatalogItems: action.data, currentPage: action.data.page, catalogId: action.catalog,
                    catalogName: action.data.catalog
                };
        default:
            return {...state};
    }
}
