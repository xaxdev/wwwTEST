const host = HOSTNAME || 'localhost';

export const ROOT_URL = `//${host}:3002`;
export const FETCH_ALLITEMS = 'FETCH_ALLITEMS';
export const FETCH_ITEM = 'FETCH_ITEM';
export const FETCH_SORTING = 'FETCH_SORTING';
export const NEWSEARCH = 'NEWSEARCH';
export const MODIFY_SEARCH = 'MODIFY_SEARCH';
export const SET_PARAMS = 'SET_PARAMS';
export const SET_CURRENTPAGE = 'SET_CURRENTPAGE';
export const SET_PAGESIZE = 'SET_PAGESIZE';
export const SET_SORTBY = 'SET_SORTBY';
export const SET_SORTDIRECTION = 'SET_SORTDIRECTION';
export const SET_SHOWGRIDVIEW = 'SET_SHOWGRIDVIEW';
export const SET_SHOWLISTVIEW = 'SET_SHOWLISTVIEW';
export const GET_CATALOGNAME = 'GET_CATALOGNAME';
export const ADD_CATALOG = 'ADD_CATALOG';
export const GET_CATALOGITEMS = 'GET_CATALOGITEMS';
export const DELETE_ITEMSFROMCATALOG = 'DELETE_ITEMSFROMCATALOG';
export const SET_SLECTEDCATALOG = 'SET_SLECTEDCATALOG';
export const SET_NEWCATALOGNAME = 'SET_NEWCATALOGNAME';
export const DELETE_CATALOG = 'DELETE_CATALOG';
export const LASTMODIFIED = 1;
export const REFERENCE = 2;
export const DESCRIPTION = 3;
export const DESCENDING = -1;
export const ASCENDING = 1;
export const SET_CATALOGSORTBY = 'SET_CATALOGSORTBY';
export const SET_CATALOGSORTDIRECTION = 'SET_CATALOGSORTDIRECTION';
export const SET_CATALOGCURRENTPAGE = 'SET_CATALOGCURRENTPAGE';
export const SET_RENAMECATALOG = 'SET_RENAMECATALOG';
