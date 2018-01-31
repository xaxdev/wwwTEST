import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import {
    FETCH_ALLITEMS, FETCH_ITEM, ROOT_URL, FETCH_SORTING, NEWSEARCH, MODIFY_SEARCH, SET_PARAMS, SET_CURRENTPAGE, SET_PAGESIZE,
    SET_SORTBY, SET_SORTDIRECTION, SET_SHOWGRIDVIEW, SET_SHOWLISTVIEW, GET_CATALOGNAME, ADD_CATALOG, GET_CATALOGITEMS,
    DELETE_ITEMSFROMCATALOG, SET_SLECTEDCATALOG, SET_NEWCATALOGNAME, DELETE_CATALOG, SET_CATALOGSORTBY, SET_CATALOGSORTDIRECTION,
    SET_CATALOGCURRENTPAGE, SET_RENAMECATALOG, WRITE_HTML, SET_SHARECATALOG, SET_CLOSEALERTMSG, SET_ISCATALOGSHARED, POST_SAVESEARCH,
    SET_ISSAVESEARCH,SET_ITEMSORDER,SET_SETREFERENCEORDER,FETCH_ALLPDF,ADD_NEWSETCATALOGITEM, GET_SETCATALOGNAME, GET_SETCATALOGITEMS,
    SET_RENAMESETCATALOG, SET_NEWSETCATALOGNAME, DELETE_SETCATALOG, SET_SHARESETCATALOG, SET_CLOSEALERTMSGSET, SET_SETCATALOGSORTBY,
    SET_SETCATALOGSORTDIRECTION
} from '../constants/itemconstants';

import { SET_SHAREEMAILTO } from '../constants/userConstants';
import urlCurrPage from '../utils/getUrlApiCurrPage';

export function getAllPDF(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/items/searchpdf`;

    return {
        type: FETCH_ALLPDF,
        promise: fetch(url,{
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        }),
        currPage: params.page
    }
}
export function setSetReferenceOrder(value){
    return {
        type: SET_SETREFERENCEORDER,
        setReferenceOrder: value
    }
}
export function setItemsOrder(value){
    return {
        type: SET_ITEMSORDER,
        itemsOrder: value
    }
}

export function getCatalogItemsWithSetItem(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/catalog/setitem/${params.id}?page=${params.page}&size=${params.size}&sort=${params.sort}&order=${params.order}`;
    return {
        type: GET_CATALOGITEMS,
        promise: fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }),
        catalog: params.id
    }
}

export function getSetCatalogItemsWithSetItem(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/catalog/setcatalogitem/${params.id}?page=${params.page}&size=${params.size}&sort=${params.sort}&order=${params.order}`;
    return {
        type: GET_SETCATALOGITEMS,
        promise: fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }),
        catalog: params.id
    }
}

export function getCatalogNameSetItem(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/catalog/webnamessetitem`;

    return {
        type: GET_CATALOGNAME,
        promise: fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
    }
}

export function getSetCatalogName(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/catalog/webnamessetcatalog`;

    return {
        type: GET_SETCATALOGNAME,
        promise: fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
    }
}

export function addCatalogSetItem(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/catalog/setitem`;
    return {
        type: ADD_CATALOG,
        promise: fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(params)
        })
    }
}

export function addNewSetCatalogItem(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/catalog/setcatalogitem`;
    return {
        type: ADD_NEWSETCATALOGITEM,
        promise: fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(params)
        })
    }
}

export function setIsSAveSearch(value){
    return {
        type: SET_ISSAVESEARCH,
        isSAveSearch: value
    }
}

export function saveSearchCriteria(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/items/search/save`;

    return {
        type: POST_SAVESEARCH,
        promise: fetch(url,{
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
    }
}
export function setIsCatalogShare(value){
    return {
        type: SET_ISCATALOGSHARED,
        isCatalogShared: value
    }
}

export function setCloseAlertMsg(value){
    return {
        type: SET_CLOSEALERTMSG,
        closeAlertMsg:value
    }
}

export function setCloseAlertMsgSet(value){
    return {
        type: SET_CLOSEALERTMSGSET,
        closeAlertMsgSet:value
    }
}

export function shareCatalog(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/catalog/shared`;
    return {
        type: SET_SHARECATALOG,
        promise: fetch(url,{
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
    }
}

export function shareSetCatalog(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/catalog/sharedset`;
    return {
        type: SET_SHARESETCATALOG,
        promise: fetch(url,{
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
    }
}

export function setDataSendEmailTo(value){
    return {
        type: SET_SHAREEMAILTO,
        shareEmailTo:value
    }
}

export function writeHtml(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/items/writehtml`;

    return {
        type: WRITE_HTML,
        promise: fetch(url,{
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
    }
}
export function setRenameCatalog(value){
    return {
        type: SET_RENAMECATALOG,
        catalogName: value
    }
}
export function setRenameSetCatalog(value){
    return {
        type: SET_RENAMESETCATALOG,
        setCatalogName: value
    }
}
export function deleteCatalog(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/catalog/${params.id}`;
    return {
        type: DELETE_CATALOG,
        promise: fetch(url,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }),
        catalogId: params.id
    }
}
export function deleteSetCatalog(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/catalog/set/${params.id}`;
    return {
        type: DELETE_SETCATALOG,
        promise: fetch(url,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }),
        catalogId: params.id
    }
}
export function setNewCatalogName(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/catalog/rename`;
    return {
        type: SET_NEWCATALOGNAME,
        promise: fetch(url,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(params)
        }),
        catalogName: params.catalog
    }
}
export function setNewSetCatalogName(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/catalog/renameset`;
    return {
        type: SET_NEWSETCATALOGNAME,
        promise: fetch(url,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(params)
        }),
        setCatalogName: params.setCatalog
    }
}
export function setSelectedCatalog(value){
    return {
        type: SET_SLECTEDCATALOG,
        catalog: value
    }
}
export function getCatalogItems(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/catalog/${params.id}?page=${params.page}&size=${params.size}&sort=${params.sort}&order=${params.order}`;
    return {
        type: GET_CATALOGITEMS,
        promise: fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }),
        catalog: params.id
    }
}
export function deleteCatalogItems(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/catalog/item`;
    return {
        type: DELETE_ITEMSFROMCATALOG,
        promise: fetch(url,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(params)
        }),
        catalog: params.id
    }
}
export function addCatalog(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/catalog`;
    return {
        type: ADD_CATALOG,
        promise: fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(params)
        })
    }
}
export function getCatalogName(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/catalog/webnames`;

    return {
        type: GET_CATALOGNAME,
        promise: fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
    }
}
export function setShowGridView(value){
    return {
        type: SET_SHOWGRIDVIEW,
        showGridView: value
    }
}
export function setShowListView(value){
    return {
        type: SET_SHOWLISTVIEW,
        showListView: value
    }
}
export function setCatalogCurrentPage(value){
    return {
        type: SET_CATALOGCURRENTPAGE,
        currentPage: value
    }
}
export function setCatalogSortingBy(value){
    return {
        type: SET_CATALOGSORTBY,
        sortingBy: value
    }
}
export function setSetCatalogSortingBy(value){
    return {
        type: SET_SETCATALOGSORTBY,
        sortingBy: value
    }
}
export function setCatalogSortDirection(value){
    return {
        type: SET_CATALOGSORTDIRECTION,
        sortDirection: value
    }
}
export function setSetCatalogSortDirection(value){
    return {
        type: SET_SETCATALOGSORTDIRECTION,
        sortDirection: value
    }
}
export function setSortingBy(value){
    return {
        type: SET_SORTBY,
        sortingBy: value
    }
}
export function setSortDirection(value){
    return {
        type: SET_SORTDIRECTION,
        sortDirection: value
    }
}
export function getItems(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/items/search`;

    return {
        type: FETCH_ALLITEMS,
        promise: fetch(url,{
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        }),
        currPage: params.page
    }
}

export function exportDatas(params){
    const token = sessionStorage.token;
    let url = `${ROOT_URL}/api/items/export`;

    return {
        type: FETCH_ALLITEMS,
        promise: fetch(url,{
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            },
        }),
        currPage: params.page
    }
}

export function sortBy(data,sortBy,sortDirections){
    const token = sessionStorage.token;
    return {
        type: FETCH_SORTING,
        sortBy: sortBy,
        sortDirections: sortDirections,
        data: data
    }
}

export function newSearch(){
    const token = sessionStorage.token;
    return {
        type: NEWSEARCH
    }
}
export function modifySearch(paramsSearch){
    const token = sessionStorage.token;
    return {
        type: MODIFY_SEARCH,
        params: paramsSearch
    }
}
export function setParams(params){
    const token = sessionStorage.token;
    return {
        type: SET_PARAMS,
        params: params
    }
}
export function setCurrentPage(value){
    return {
        type: SET_CURRENTPAGE,
        currentPage: value
    }
}
export function setPageSize(value){
    return {
        type: SET_PAGESIZE,
        pageSize: value
    }
}
