import {
    FETCH_PRODUCTDETAIL,FETCH_PRODUCTRELETED,FETCH_SETREFERENCE,ADD_CATALOG,ADD_CATALOG_SUCCESS,GET_LOTNUMBER,GET_LOTNUMBERPAGE,
    GET_MOVEMENT,FETCH_SETDETAILS,FETCH_ALLITEMS, GET_SETCATALOGITEMSLIST,FETCH_SETCATALOGDETAILS,FETCH_SALESPRODUCTDETAIL,FETCH_SALESPRODUCTRELETED,
    FETCH_SALESSETDETAILS,FETCH_SALESVIEWASSETDETAILS, FETCH_SALESVIEWASSETPRODUCTDETAIL
} from '../../constants/productdetailconstants';
import { GET_CATALOGNAME} from '../../constants/itemconstants';
const INITIAL_STATE = {
    detail:'',relete:'',reletepage:1,productlist:null,index:1,indexplus:1,pagego:1,setreference:'',ListCatalogName: [], lotNumbers: [],
    stonActivePage:1,totalpage:null ,stonePageSize:20, activities:[], allData:[],setItemIndex:1,setItemList:[],salessetdetail:'', salessetindexplus:1, salessetpagego:1,
    salessetproductlist:null, salessettotalpage:null,salessetindex:1, message:'', statusCode: 200
};

export default function(state = INITIAL_STATE,action){

    switch (action.type) {
        case FETCH_SALESVIEWASSETPRODUCTDETAIL:
            return { ...state,detail:action.data,index:action.productlist?findproductindex(action.productlist,action.productid):0
                ,indexplus:action.productlist?findproductindexplus(action.productlist,action.productid):0
                ,pagego:action.productlist?findproductindexplus(action.productlist,action.productid):0
                ,productlist:action.productlist,lotNumbers:!!action.data.lotNumbers ? filterLotNumbers(action.data.lotNumbers) : []
                ,totalpage:Math.ceil(!!action.data.lotNumbers ? filterLotNumbers(action.data.lotNumbers).length/20 : action.data.length/20)
            }
        case FETCH_SALESVIEWASSETDETAILS:
            return {...state,detail:action.data, salessetindex:action.productlist?findSetIndex(action.productlist,action.productid):0
                ,salessetindexplus:action.productlist?findSetIndexPlus(action.productlist,action.productid):0
                ,salessetpagego:action.productlist?findSetIndexPlus(action.productlist,action.productid):0
                ,salessetproductlist:action.productlist, salessettotalpage: Math.ceil(action.data.length/20)}
        case FETCH_SALESSETDETAILS:
            return {...state,detail:action.data, salessetindex:action.productlist?findSetIndex(action.productlist,action.productid):0
                ,salessetindexplus:action.productlist?findSetIndexPlus(action.productlist,action.productid):0
                ,salessetpagego:action.productlist?findSetIndexPlus(action.productlist,action.productid):0
                ,salessetproductlist:action.productlist, salessettotalpage: Math.ceil(action.data.length/20)}
        case FETCH_SALESPRODUCTDETAIL:
            return { ...state,detail:action.data,index:action.productlist?findproductindex(action.productlist,action.productid):0
                ,indexplus:action.productlist?findproductindexplus(action.productlist,action.productid):0
                ,pagego:action.productlist?findproductindexplus(action.productlist,action.productid):0
                ,productlist:action.productlist,lotNumbers:!!action.data.lotNumbers ? filterLotNumbers(action.data.lotNumbers) : []
                ,totalpage:Math.ceil(!!action.data.lotNumbers ? filterLotNumbers(action.data.lotNumbers).length/20 : action.data.length/20)
            }
        case FETCH_SALESPRODUCTRELETED:
            return {...state,relete:action.data,reletepage:action.page}
        case FETCH_SETCATALOGDETAILS:
            return {...state,detail:action.data, index:action.productlist?findSetIndex(action.productlist,action.productid):0
                ,indexplus:action.productlist?findSetIndexPlus(action.productlist,action.productid):0
                ,pagego:action.productlist?findSetIndexPlus(action.productlist,action.productid):0
                ,productlist:action.productlist, totalpage: Math.ceil(action.data.length/20)}
        case GET_SETCATALOGITEMSLIST :
            return { ...state, setItemIndex:action.data.allItems?findSetIndex(action.data.allItems,action.setReferenceId):0,
                setItemList:action.data.allItems,pagego:action.data.allItems?findSetIndexPlus(action.data.allItems,action.setReferenceId):0
            };
        case FETCH_ALLITEMS:
            return { ...state, allData: action.data.allData};
        case FETCH_SETDETAILS:
            return {...state,detail:action.data, index:action.productlist?findSetIndex(action.productlist,action.productid):0
                ,indexplus:action.productlist?findSetIndexPlus(action.productlist,action.productid):0
                ,pagego:action.productlist?findSetIndexPlus(action.productlist,action.productid):0
                ,productlist:action.productlist, totalpage: Math.ceil(action.data.length/20)}
        case GET_MOVEMENT:
            return {...state, activities: !!action.datas ? action.datas : []}
        case GET_LOTNUMBERPAGE:
            return { ...state, lotNumbers: !!action.datas ? filterLotNumbers(action.datas).slice( (action.page - 1) * action.size, action.page * action.size ) : []
                ,stonActivePage: action.page,totalpage: !!action.datas ? Math.ceil(filterLotNumbers(action.datas).length/action.size) : 0
            }
        case GET_LOTNUMBER:
            return {...state,detail: action.data,totalpage: !!action.data.lotNumbers ? Math.ceil(filterLotNumbers(action.data.lotNumbers).length/action.size): 0}
        case FETCH_PRODUCTDETAIL:
            return { ...state,detail:action.data,index:action.productlist?findproductindex(action.productlist,action.productid):0
                ,indexplus:action.productlist?findproductindexplus(action.productlist,action.productid):0
                ,pagego:action.productlist?findproductindexplus(action.productlist,action.productid):0
                ,productlist:action.productlist,lotNumbers:!!action.data.lotNumbers ? filterLotNumbers(action.data.lotNumbers) : []
                ,totalpage:Math.ceil(!!action.data.lotNumbers ? filterLotNumbers(action.data.lotNumbers).length/20 : action.data.length/20)
            }
        case FETCH_PRODUCTRELETED:
            return {...state,relete:action.data,reletepage:action.page}
        case ADD_CATALOG:
            return {...state,message: action.data.statusCode >= 400? action.data.message: ADD_CATALOG_SUCCESS, statusCode:action.data.statusCode}
        case FETCH_SETREFERENCE:
            return {...state,setreference:action.data}
        case GET_CATALOGNAME :
            return {...state, ListCatalogName: action.data };
        default:
            return state;
    }
}

const findSetIndex = (productList, referenceId) => {
    for(let i = 0; i < productList.length; i++)
    {
        if(productList[i].reference == referenceId){return i}
    }
}
const findSetIndexPlus = (productList, referenceId) => {
    for(let i = 0; i < productList.length; i++)
    {
        if(productList[i].reference == referenceId){ return i+1 }
    }
}
const findproductindex = (productlist, productid) => {

    for(let i = 0; i < productlist.length; i++)
    {
       if(productlist[i].id == productid){
         return i
       }
    }
}
const findproductindexplus = (productlist, productid) => {
    for(let i = 0; i < productlist.length; i++)
    {
        if(productlist[i].id == productid){ return i+1 }
    }
}

const filterLotNumbers = (lotNumbers)=>{
    const paramsSearchStorage =  JSON.parse(sessionStorage.paramsSearch);
    let newLot = lotNumbers;
    let caratFrom = (!!paramsSearchStorage.totalCaratWeightFrom) ? parseFloat(paramsSearchStorage.totalCaratWeightFrom) : 0;
    let caratTo = (!!paramsSearchStorage.totalCaratWeightTo) ? parseFloat(paramsSearchStorage.totalCaratWeightTo) : 0;
    let lotQuantityFrom = (!!paramsSearchStorage.lotQuantityFrom) ? parseFloat(paramsSearchStorage.lotQuantityFrom) : 0;
    let lotQuantityTo = (!!paramsSearchStorage.lotQuantityTo) ? parseFloat(paramsSearchStorage.lotQuantityTo) : 0;
    let lotNumber = paramsSearchStorage.lotNumber;
    let markupFrom = (!!paramsSearchStorage.markupFrom) ? parseFloat(paramsSearchStorage.markupFrom) : 0;
    let markupTo = (!!paramsSearchStorage.markupTo) ? parseFloat(paramsSearchStorage.markupTo) : 0;
    let cut = paramsSearchStorage.cut;
    let color = paramsSearchStorage.color;
    let clarity = paramsSearchStorage.clarity;

    if (caratFrom > 0) {
        newLot = newLot.filter((item) => { return item.carat >= caratFrom });
    }
    if (caratTo > 0) {
        newLot = newLot.filter((item) => { return item.carat <= caratTo });
    }
    if (lotQuantityFrom > 0) {
        newLot = newLot.filter((item) => { return item.lotQty >= lotQuantityFrom });
    }
    if (lotQuantityTo > 0) {
        newLot = newLot.filter((item) => { return item.lotQty <= lotQuantityTo });
    }
    if (!!lotNumber && lotNumber != '') {
        newLot = newLot.filter((item) => { return item.lotNumber == lotNumber });
    }
    if (markupFrom > 0) {
        newLot = newLot.filter((item) => { return item.markup >= markupFrom });
    }
    if (markupTo > 0) {
        newLot = newLot.filter((item) => { return item.markup <= markupTo });
    }
    if (!!cut) {
        let customLot = [];
        let custom = [];
        if (cut.indexOf(',') != -1) {
            let values =  cut.split(',');
            values.forEach((val)=>{
                customLot = newLot.filter((item) => { return item.cut == val });
                if (customLot.length > 0) {
                    newLot = custom.concat(customLot);
                }
            });
        }else {
            newLot = newLot.filter((item) => { return item.cut == cut });
        }
    }
    if (!!color) {
        let customLot = [];
        let custom = [];
        if (color.indexOf(',') != -1) {
            let values =  color.split(',');
            values.forEach((val)=>{
                customLot = newLot.filter((item) => { return item.color == val });
                if (customLot.length > 0) {
                    newLot = custom.concat(customLot);
                }
            });
        }else {
            newLot = newLot.filter((item) => { return item.color == color });
        }
    }
    if (!!clarity) {
        let customLot = [];
        let custom = [];
        if (clarity.indexOf(',') != -1) {
            let values =  clarity.split(',');
            values.forEach((val)=>{
                customLot = newLot.filter((item) => { return item.clarity == val });
                if (customLot.length > 0) {
                    newLot = custom.concat(customLot);
                }
            });
        }else {
            newLot = newLot.filter((item) => { return item.clarity == clarity });
        }
    }
    return newLot;
}
