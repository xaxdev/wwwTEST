import { FETCH_PRODUCTDETAIL,FETCH_PRODUCTRELETED,FETCH_SETREFERENCE,ADD_CATALOG,ADD_CATALOG_SUCCESS,
        GET_LOTNUMBER,GET_LOTNUMBERPAGE} from '../../constants/productdetailconstants';
import { GET_CATALOGNAME} from '../../constants/itemconstants';
const INITIAL_STATE = {detail:'',relete:'',reletepage:1,productlist:null,index:1,indexplus:1,pagego:1,
                        setreference:'',ListCatalogName: [], lotNumbers: [],stonActivePage:1,totalpage:null
                        ,stonePageSize:20};


export default function(state = INITIAL_STATE,action){
    // console.log(action.type);

    switch (action.type) {
        case GET_LOTNUMBERPAGE:
          return {...state, lotNumbers: filterLotNumbers(action.datas).slice( (action.page - 1) * action.size, action.page * action.size )
                    ,stonActivePage: action.page,totalpage:Math.ceil(filterLotNumbers(action.datas).length/action.size)}
        case GET_LOTNUMBER:
          return {...state,detail: action.data,totalpage:Math.ceil(filterLotNumbers(action.data.lotNumbers).length/action.size)}
      case FETCH_PRODUCTDETAIL:
        return {...state,detail:action.data,index:action.productlist?findproductindex(action.productlist,action.productid):0
          ,indexplus:action.productlist?findproductindexplus(action.productlist,action.productid):0
          ,pagego:action.productlist?findproductindexplus(action.productlist,action.productid):0
          ,productlist:action.productlist,lotNumbers:filterLotNumbers(action.data.lotNumbers)
          ,totalpage:Math.ceil(filterLotNumbers(action.data.lotNumbers).length/20)}
      case FETCH_PRODUCTRELETED:
        return {...state,relete:action.data,reletepage:action.page}
      case ADD_CATALOG:
        return {...state,message: action.data.statusCode >= 400? action.data.message: ADD_CATALOG_SUCCESS}
      case FETCH_SETREFERENCE:
        return {...state,setreference:action.data}
      case GET_CATALOGNAME :
        return {...state, ListCatalogName: action.data };
      default:
        return state;
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
       if(productlist[i].id == productid){
         return i+1
       }
    }
}

const filterLotNumbers = (lotNumbers)=>{
    const paramsSearchStorage =  JSON.parse(sessionStorage.paramsSearch);
    // console.log(paramsSearchStorage);
    let newLot = lotNumbers;
    let caratFrom = (!!paramsSearchStorage.totalCaratWeightFrom) ? parseFloat(paramsSearchStorage.totalCaratWeightFrom) : 0;
    let caratTo = (!!paramsSearchStorage.totalCaratWeightTo) ? parseFloat(paramsSearchStorage.totalCaratWeightTo) : 0;
    let lotQuantityFrom = (!!paramsSearchStorage.lotQuantityFrom) ? parseFloat(paramsSearchStorage.lotQuantityFrom) : 0;
    let lotQuantityTo = (!!paramsSearchStorage.lotQuantityTo) ? parseFloat(paramsSearchStorage.lotQuantityTo) : 0;
    let lotNumber = paramsSearchStorage.lotNumber;
    let markupFrom = (!!paramsSearchStorage.markupFrom) ? parseFloat(paramsSearchStorage.markupFrom) : 0;
    let markupTo = (!!paramsSearchStorage.markupTo) ? parseFloat(paramsSearchStorage.markupTo) : 0;

    if (caratFrom > 0) {
        newLot = newLot.filter((item) => {
                                return item.carat >= caratFrom
                            });
    }
    if (caratTo > 0) {
        newLot = newLot.filter((item) => {
                                return item.carat <= caratTo
                            });
    }
    if (lotQuantityFrom > 0) {
        newLot = newLot.filter((item) => {
                                return item.lotQty >= lotQuantityFrom
                            });
    }
    if (lotQuantityTo > 0) {
        newLot = newLot.filter((item) => {
                                return item.lotQty <= lotQuantityTo
                            });
    }
    if (!!lotNumber && lotNumber != '') {
        newLot = newLot.filter((item) => {
                                return item.lotNumber == lotNumber
                            });
    }
    if (markupFrom > 0) {
        newLot = newLot.filter((item) => {
                                return item.markup >= markupFrom
                            });
    }
    if (markupTo > 0) {
        newLot = newLot.filter((item) => {
                                return item.markup <= markupTo
                            });
    }
    // console.log(newLot);
    return newLot;
}
