import  {
    GET_CATALOGITEMS, DELETE_ITEMSFROMCATALOG, SET_SLECTEDCATALOG, SET_NEWCATALOGNAME, DELETE_CATALOG,
    GET_CATALOGNAME, SET_CATALOGSORTBY, SET_CATALOGSORTDIRECTION, SET_CATALOGCURRENTPAGE, SET_RENAMECATALOG,
    SET_SHARECATALOG, SET_CLOSEALERTMSG, SET_ISCATALOGSHARED, GET_SETCATALOGNAME
} from '../../constants/itemconstants';

const INITIAL_STATE = {
    datas:null, ListCatalogName: [], listCatalogItems:[], currentPage: 1, catalogId: null,catalogName: null, catalogSortingBy: null
    , catalogSortDirection: null, totalPrice: null, totalUpdatedCost: null,shareCatalogStatus: false, msg: ''
    ,shareCatalogStatusCode: 100, isCatalogShared: false, ListSetCatalogName: []
};

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case GET_SETCATALOGNAME :
            return {...state, ListSetCatalogName: action.data };
        case SET_ISCATALOGSHARED :
            return {...state, isCatalogShared: action.isCatalogShared};
        case SET_CLOSEALERTMSG :
            return {...state,  shareCatalogStatusCode: action.closeAlertMsg, shareCatalogStatus: false, msg: ''}
        case SET_SHARECATALOG :
            return {...state,  shareCatalogStatus: (action.data.statusCode >= 400) ? false : true,
              shareCatalogStatusCode : action.data.statusCode,
              msg: action.data.message};
        case SET_RENAMECATALOG :
            return {...state, catalogName: action.catalogName };
        case SET_CATALOGCURRENTPAGE :
            return {...state, currentPage: action.currentPage };
        case SET_CATALOGSORTBY :
            return {...state, catalogSortingBy: action.sortingBy };
        case SET_CATALOGSORTDIRECTION :
            return {...state, catalogSortDirection: action.sortDirection };
        case DELETE_CATALOG :
            return {...state, catalogId: action.catalogId };
        case SET_NEWCATALOGNAME :
            return {...state, catalogName: action.catalogName };
        case SET_SLECTEDCATALOG :
            return {...state, catalogId: action.catalog };
        case DELETE_ITEMSFROMCATALOG :
            return {...state, catalogId: action.catalog};
        case GET_CATALOGNAME :
            return {...state, ListCatalogName: action.data };
        case GET_CATALOGITEMS :
            return {
                ...state, listCatalogItems: action.data, currentPage: action.data.page, catalogId: action.catalog,
                        catalogName: action.data.catalog, totalPrice: action.data.price,
                        totalUpdatedCost: action.data.updatedCost
            };
        default:
            return {...state};
    }
}
