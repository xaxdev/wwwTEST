import  {
    GET_CATALOGITEMS, DELETE_ITEMSFROMCATALOG, SET_SLECTEDCATALOG, SET_NEWCATALOGNAME, DELETE_CATALOG, GET_CATALOGNAME,
    SET_CATALOGSORTBY, SET_CATALOGSORTDIRECTION, SET_CATALOGCURRENTPAGE, SET_RENAMECATALOG, SET_SHARECATALOG, SET_CLOSEALERTMSG,
    SET_ISCATALOGSHARED, GET_SETCATALOGNAME, GET_SETCATALOGITEMS,SET_RENAMESETCATALOG, SET_NEWSETCATALOGNAME, DELETE_SETCATALOG,
    SET_SHARESETCATALOG, SET_CLOSEALERTMSGSET, SET_SETCATALOGSORTBY, SET_SETCATALOGSORTDIRECTION, DELETE_ITEMSFROMSETCATALOG
} from '../../constants/itemconstants';

import  {
    FETCH_ALLNAME, FETCH_YINGCATALOGDETAIL, FETCH_ITEMDETAIL, SET_ITEMSLIST, SET_YINGDELETEDITEM, SET_YINGEDITITEMREFERENCE, SET_YINGSETDETAILADDRESS,
    SET_YINGSETDETAILREMARK, SET_YINGSETIMAGEBASE64, GET_YINGSETREFERENCE, SET_CHANGEDORDERSETREFERENCE, FETCH_SOMENAME, SET_SHAREDYINGSET, 
    FETCH_ALLYINGNAME, SET_EDITITEMDETAILS
} from '../../constants/yingConstants';

const INITIAL_STATE = {
    datas: null, ListCatalogName: [], listCatalogItems:[], currentPage: 1, catalogId: null,catalogName: null, catalogSortingBy: null , catalogSortDirection: null, 
    totalPrice: null, totalUpdatedCost: null,shareCatalogStatus: false, msg: '' , shareCatalogStatusCode: 100, isCatalogShared: false, ListSetCatalogName: [], 
    listSetCatalogItems:[], setCurrentPage: 1 , setCatalogId: null, setCatalogName: null, setTotalPrice: null, setTotalUpdatedCost: null, 
    shareSetCatalogStatus: false , shareSetCatalogStatusCode: 100, msgSet: '', setCatalogSortingBy: null, setCatalogSortDirection: null, yingCatalogName:[],
    totalPages: null, yingCatalogDetail: null, yingCatalogDetailStatus: false, yingCatalogDetailStatusCode: 100, yingCatalogDetailMsg: null,
    yingCatalogTotalPages: null, yingItemDetail: null, listItem: [], isDeletedItem: false, editItemReference: null, setDetailAddress: null, 
    setDetailRemark: null, yingSetReference: [], changedOrder: [], sharedYingStatus: false, sharedYingStatusCode: 100, ListYingCatalogName: [],
    isEditItemDetails: false
};

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case SET_EDITITEMDETAILS :
            return {...state, isEditItemDetails: action.isEditItemDetails };
        case FETCH_ALLYINGNAME :
            return {...state, ListYingCatalogName: action.data.data };
        case SET_SHAREDYINGSET :
            return {...state,  sharedYingStatus: (action.data.statusCode >= 400) ? false : true, sharedYingStatusCode : action.data.statusCode,
                msg: action.data.message
            };
            break;
        case FETCH_SOMENAME :
            return {...state, yingCatalogName: action.data.data, totalPages: Math.ceil(action.data.countAll/action.size)};
        case SET_CHANGEDORDERSETREFERENCE :
            return {...state, changedOrder: action.changedOrder };
        case GET_YINGSETREFERENCE :            
            return {...state, yingSetReference: action.data.data };
        case SET_YINGSETIMAGEBASE64 :
            return {...state, setImageBase64: action.setImageBase64 };
        case SET_YINGSETDETAILREMARK :
            return {...state, setDetailRemark: action.setDetailRemark };
        case SET_YINGSETDETAILADDRESS :
            return {...state, setDetailAddress: action.setDetailAddress };
        case SET_YINGEDITITEMREFERENCE :
            return {...state, editItemReference: action.editItemReference };
        case SET_YINGDELETEDITEM :
            return {...state, isDeletedItem: action.isDeletedItem };
        case SET_ITEMSLIST :
            if (action.listItem.length == 0) {
                return {...state, listItem: action.listItem, yingItemDetail: null };   
            } else {
                return {...state, listItem: action.listItem};
            }
        case FETCH_ITEMDETAIL :
            return {...state, yingItemDetail: action.data.item };
        case FETCH_YINGCATALOGDETAIL :
            return {...state, yingCatalogDetail: action.data.yingCatalogDetail, yingCatalogTotalPages: (action.data.statusCode >= 400) ? 1 : Math.ceil(action.data.countAll/action.size), 
                yingCatalogDetailStatus: (action.data.statusCode >= 400) ? false : true, yingCatalogDetailStatusCode : action.data.statusCode,
                yingCatalogDetailMsg: action.data.message, setDetailAddress: (!!action.data.yingCatalogDetail)? action.data.yingCatalogDetail.address: null, 
                setDetailRemark: (!!action.data.yingCatalogDetail)? action.data.yingCatalogDetail.remark: null, 
                listItem: (!!action.data.yingCatalogDetail)? action.data.yingCatalogDetail.items: []
            };
        case FETCH_ALLNAME :
            return {...state, yingCatalogName: action.data.data, totalPages: Math.ceil(action.data.countAll/action.size)};
        case DELETE_ITEMSFROMSETCATALOG :
            return {...state, setCatalogId: action.catalog};
        case SET_SETCATALOGSORTDIRECTION :
            return {...state, setCatalogSortDirection: action.sortDirection };
        case SET_SETCATALOGSORTBY :
            return {...state, setCatalogSortingBy: action.sortingBy };
        case SET_CLOSEALERTMSGSET :
            return {...state,  shareSetCatalogStatusCode: action.closeAlertMsg, shareSetCatalogStatus: false, msgSet: ''}
        case SET_SHARESETCATALOG :
            return {...state,  shareSetCatalogStatus: (action.data.statusCode >= 400) ? false : true,
              shareSetCatalogStatusCode : action.data.statusCode,
              msgSet: action.data.message};
        case DELETE_SETCATALOG :
            return {...state, setCatalogId: action.setCatalogId };
        case SET_NEWSETCATALOGNAME :
            return {...state, setCatalogName: action.setCatalogName };
        case SET_RENAMESETCATALOG :
            return {...state, setCatalogName: action.setCatalogName };
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
        case GET_SETCATALOGITEMS :
            return {
                ...state, listSetCatalogItems: action.data, setCurrentPage: action.data.page, setCatalogId: action.catalog,
                        setCatalogName: action.data.setCatalog, setTotalPrice: action.data.setItemPrice,
                        setTotalUpdatedCost: action.data.setItemUpdatedCost
            };
        default:
            return {...state};
    }
}
