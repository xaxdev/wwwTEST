import  {
        GET_CATALOGITEMS, DELETE_ITEMSFROMCATALOG, SET_SLECTEDCATALOG, SET_NEWCATALOGNAME, DELETE_CATALOG,
        GET_CATALOGNAME, SET_CATALOGSORTBY, SET_CATALOGSORTDIRECTION, SET_CATALOGCURRENTPAGE, SET_RENAMECATALOG,
        SET_SHARECATALOG, SET_CLOSEALERTMSG, SET_ISCATALOGSHARED
        } from '../../constants/itemconstants';

const INITIAL_STATE = { datas:null, ListCatalogName: [], listCatalogItems:[], currentPage: 1, catalogId: null,
                        catalogName: null, catalogSortingBy: null, catalogSortDirection: null, totalPrice: null,
                        totalUpdatedCost: null,shareCatalogStatus: false, msg: '',shareCatalogStatusCode: 100,
                        isCatalogShared: false
                        };

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case SET_ISCATALOGSHARED :
            return {...state, isCatalogShared: action.isCatalogShared};
        case SET_CLOSEALERTMSG :
            return {...state,  shareCatalogStatusCode: action.closeAlertMsg, shareCatalogStatus: false, msg: ''}
        case SET_SHARECATALOG :
        //   console.log('action SET_SHARECATALOG -->',action);
          return {...state,  shareCatalogStatus: (action.data.statusCode >= 400) ? false : true,
              shareCatalogStatusCode : action.data.statusCode,
              msg: action.data.message};
        case SET_RENAMECATALOG :
          // console.log('SET_SORTBY -->',action.sortingBy);
          return {...state, catalogName: action.catalogName };
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
        //   console.log('action.data-->',action.data.items.sort((a, b) => b.reference - a.reference));
          return {...state, listCatalogItems: action.data, currentPage: action.data.page, catalogId: action.catalog,
                    catalogName: action.data.catalog, totalPrice: action.data.price,
                    totalUpdatedCost: action.data.updatedCost
                };
        default:
            return {...state};
    }
}
