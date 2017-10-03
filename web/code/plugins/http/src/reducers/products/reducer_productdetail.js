import { FETCH_PRODUCTDETAIL,FETCH_PRODUCTRELETED,FETCH_SETREFERENCE,ADD_CATALOG,ADD_CATALOG_SUCCESS,
        GET_LOTNUMBER,GET_LOTNUMBERPAGE,GET_MOVEMENT,FETCH_SETDETAILS,FETCH_ALLITEMS
        } from '../../constants/productdetailconstants';
import { GET_CATALOGNAME} from '../../constants/itemconstants';
const INITIAL_STATE = {detail:'',relete:'',reletepage:1,productlist:null,index:1,indexplus:1,pagego:1,
                        setreference:'',ListCatalogName: [], lotNumbers: [],stonActivePage:1,totalpage:null
                        ,stonePageSize:20, activities:[], allData:[]
                      };


export default function(state = INITIAL_STATE,action){
    // console.log(action.type);

    switch (action.type) {
        case FETCH_ALLITEMS:
            return { ...state, allData: action.data.allData};
        case FETCH_SETDETAILS:
            // console.log('FETCH_SETDETAILS-->',action.data);
            // return {...state,detail:action.data,index:action.productlist?findproductindex(action.productlist,action.productid):0
            //   ,indexplus:action.productlist?findproductindexplus(action.productlist,action.productid):0
            //   ,pagego:action.productlist?findproductindexplus(action.productlist,action.productid):0
            //   ,productlist:action.productlist,lotNumbers:!!action.data.lotNumbers ? filterLotNumbers(action.data.lotNumbers) : []
            //   ,totalpage:Math.ceil(!!action.data.lotNumbers ? filterLotNumbers(action.data.lotNumbers).length/20 : action.data.length/20)}
            return {...state,detail:action.data, index:action.productlist?findSetIndex(action.productlist,action.productid):0
              ,indexplus:action.productlist?findSetIndexPlus(action.productlist,action.productid):0
              ,pagego:action.productlist?findSetIndexPlus(action.productlist,action.productid):0
              ,productlist:action.productlist, totalpage: Math.ceil(action.data.length/20)}
      case GET_MOVEMENT:
        return {...state, activities: !!action.datas ? action.datas : []}
      case GET_LOTNUMBERPAGE:
        return {...state, lotNumbers: !!action.datas ? filterLotNumbers(action.datas).slice( (action.page - 1) * action.size, action.page * action.size ) : []
                    ,stonActivePage: action.page,totalpage: !!action.datas ? Math.ceil(filterLotNumbers(action.datas).length/action.size) : 0}
      case GET_LOTNUMBER:
        return {...state,detail: action.data,totalpage: !!action.data.lotNumbers ? Math.ceil(filterLotNumbers(action.data.lotNumbers).length/action.size): 0}
      case FETCH_PRODUCTDETAIL:
        // console.log(action);
        return {...state,detail:action.data,index:action.productlist?findproductindex(action.productlist,action.productid):0
          ,indexplus:action.productlist?findproductindexplus(action.productlist,action.productid):0
          ,pagego:action.productlist?findproductindexplus(action.productlist,action.productid):0
          ,productlist:action.productlist,lotNumbers:!!action.data.lotNumbers ? filterLotNumbers(action.data.lotNumbers) : []
          ,totalpage:Math.ceil(!!action.data.lotNumbers ? filterLotNumbers(action.data.lotNumbers).length/20 : action.data.length/20)}
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

const findSetIndex = (productList, referenceId) => {
    // console.log('findSetIndex-->',referenceId);
    for(let i = 0; i < productList.length; i++)
    {
       if(productList[i].reference == referenceId){
         return i
       }
    }
}
const findSetIndexPlus = (productList, referenceId) => {
    for(let i = 0; i < productList.length; i++)
    {
       if(productList[i].reference == referenceId){
         return i+1
       }
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
    let cut = paramsSearchStorage.cut;
    let color = paramsSearchStorage.color;
    let clarity = paramsSearchStorage.clarity;

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
    if (!!cut) {
        let customLot = [];
        let custom = [];
        if (cut.indexOf(',') != -1) {
            let values =  cut.split(',');
            values.forEach((val)=>{
                customLot = newLot.filter((item) => {
                                        return item.cut == val
                                    });
                if (customLot.length > 0) {
                    newLot = custom.concat(customLot);
                }
            });
        }else {
            newLot = newLot.filter((item) => {
                return item.cut == cut
            });
        }
    }
    if (!!color) {
        let customLot = [];
        let custom = [];
        if (color.indexOf(',') != -1) {
            let values =  color.split(',');
            values.forEach((val)=>{
                customLot = newLot.filter((item) => {
                                        return item.color == val
                                    });
                if (customLot.length > 0) {
                    newLot = custom.concat(customLot);
                }
            });
        }else {
            newLot = newLot.filter((item) => {
                                    return item.color == color
                                });
        }
    }
    if (!!clarity) {
        let customLot = [];
        let custom = [];
        if (clarity.indexOf(',') != -1) {
            let values =  clarity.split(',');
            values.forEach((val)=>{
                customLot = newLot.filter((item) => {
                                        return item.clarity == val
                                    });
                if (customLot.length > 0) {
                    newLot = custom.concat(customLot);
                }
            });
        }else {
            newLot = newLot.filter((item) => {
                                    return item.clarity == clarity
                                });
        }
    }
    // console.log(newLot);
    return newLot;
}
