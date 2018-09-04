const host = HOSTNAME || 'localhost';

export const FULLPATH_LOCALFILE = 'D:/Projects/GitLab/mol2016/';
export const ROOT_URL = `//${host}:${(ENVIRONMENT!='staging')?3002:4002}/`;
export const FETCH_PRODUCTDETAIL = 'FETCH_PRODUCTDETAIL';
export const FETCH_GEMATTRDETAIL = 'FETCH_GEMATTRDETAIL';
export const FETCH_PRODUCTRELETED = 'FETCH_PRODUCTRELETED';
export const FETCH_SETREFERENCE = 'FETCH_SETREFERENCE';
export const GET_CATALOGNAME = 'GET_CATALOGNAME';
export const ADD_CATALOG = 'ADD_CATALOG';
export const ADD_CATALOG_SUCCESS = 'Add to catalog success';
export const GET_CERTIFICATE = 'GET_CERTIFICATE';
export const GET_LOTNUMBER = 'GET_LOTNUMBER';
export const GET_LOTNUMBERPAGE = 'GET_LOTNUMBERPAGE';
export const GET_MOVEMENT = 'GET_MOVEMENT';
export const FETCH_SETDETAILS = 'FETCH_SETDETAILS';
export const FETCH_ALLITEMS = 'FETCH_ALLITEMS';
export const ADD_NEWSETCATALOGITEM = 'ADD_NEWSETCATALOGITEM';
export const GET_SETCATALOGITEMSLIST = 'GET_SETCATALOGITEMSLIST';
export const FETCH_SETCATALOGDETAILS = 'FETCH_SETCATALOGDETAILS';
export const FETCH_SALESPRODUCTDETAIL = 'FETCH_SALESPRODUCTDETAIL';
export const FETCH_SALESPRODUCTRELETED = 'FETCH_SALESPRODUCTRELETED';
export const FETCH_SALESSETDETAILS = 'FETCH_SALESSETDETAILS';
export const FETCH_SALESVIEWASSETDETAILS = 'FETCH_SALESVIEWASSETDETAILS';
export const FETCH_SALESVIEWASSETPRODUCTDETAIL = 'FETCH_SALESVIEWASSETPRODUCTDETAIL';
