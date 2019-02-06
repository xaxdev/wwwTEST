const INITIAL_STATE = {
    datas:[], user: null, options:[], errors: null, statuscode: null, selectedCompany:null, selectedWarehouses:null, statusCode:null, message:null,
    locationOnHand:[],warehouseOnHand:[],onhandLocationSelected:null,ShareEmailToValue:[],canNotUseHierarchy:null,userTypeValue:null, locationSales:[],
    warehouseSales:[],salesLocationSelected:null,canNotUseSalesHierarchy:null
};

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case 'SET_NOTUSESALESHIERARCHY':
            return {...state,  canNotUseSalesHierarchy: action.notUseSalesHierarchy};
            break;
        case 'SET_USERTYPE':
            return {...state,  userTypeValue: action.userType};
            break;
        case 'SET_NOTUSEHIERARCHY':
            return {...state,  canNotUseHierarchy: action.notUseHierarchy};
            break;
        case 'FETCH_SHAREUSERS':
            return { ...state, datas: action.data.data};
        case 'SET_SHAREEMAILTO':
            return {...state, ShareEmailToValue: action.shareEmailTo };
        case 'DISABLE_USER':
            return { ...state, datas: state.datas.map(t =>
               findstatusupdate(t,action.data.data, action)
            )};
        case 'FETCH_USER':
            return { ...state, user: setnewprops(action.data.data), userTypeValue: action.data.data.permission.userType };
        case 'FETCH_USERS':
            return { ...state, datas: action.data.data };
        case 'FETCH_OPTIONS':
            return { ...state, options: action.data, locationOnHand: action.data.companies, warehouseOnHand: action.data.warehouses,
                    locationSales: action.data.companies, warehouseSales: action.data.warehouses };
        case 'SELECTED_COMPANY':
            return { ...state, options: action.data, selectedCompany: action.selected, selectedWarehouses: ''};
        case 'SELECTED_WAREHOUSES':
            return { ...state, options: action.data, selectedCompany: action.comid, selectedWarehouses: action.selected};
        case 'GET_ONHANDWAREHOUSES':
            return { ...state, options: action.data, locationOnHand: action.data.companies, warehouseOnHand: action.data.warehouses };
        case 'GET_SALESWAREHOUSES':
            return { ...state, options: action.data, locationSales: action.data.companies, warehouseSales: action.data.warehouses };
        case 'CREATE_USER':
            return { ...state, options: action.datas, selectedWarehouses: action.selected, statusCode: action.data.statusCode,
                message: action.data.message};
     default:
        return {...state};
     }
}
const setnewprops = (data) => {
    let user = data;
    let permission = data.permission;
    let bitwise = Number(permission.productGroup).toString(2);
    let bitwiseSales = Number(permission.productGroupSales).toString(2);
    let bitwisePriceSales = Number(permission.priceSales).toString(2);
    let bitwiseCategory = Number(permission.category).toString(2);
    let bitwiseSalesCategory = Number(permission.salesCategory).toString(2);
    let checkbits = bitwise.split('');
    let checkbitsSales = bitwiseSales.split('');
    let checkbitsPriceSales = bitwisePriceSales.split('');
    let checkbitsCategory = bitwiseCategory.split('');
    let checkbitsSalesCategory = bitwiseSalesCategory.split('');
    let numberDiit = checkbits.length;
    let numberDiitSales = checkbitsSales.length;
    let numberDiitPriceSales = checkbitsPriceSales.length;
    let numberDiitCategory = checkbitsCategory.length;
    let numberDiitSalesCategory = checkbitsSalesCategory.length;
    let productGroupSTO=false;
    let productGroupJLY=false;
    let productGroupWAT=false;
    let productGroupACC=false;
    let productGroupOBA=false;
    let productGroupSPA=false;
    let productGroupSalesSTO=false;
    let productGroupSalesJLY=false;
    let productGroupSalesWAT=false;
    let productGroupSalesACC=false;
    let productGroupSalesOBA=false;
    let productGroupSalesSPA=false;
    let priceSalesRTP=false;
    let priceSalesUCP=false;
    let priceSalesCTP=false;
    let priceSalesNSP=false;
    let priceSalesMGP=false;
    let priceSalesDSP=false;
    let onhandLocationValue = [];
    let salesLocationValue = [];
    let categorySTO=false;
    let categoryJLY=false;
    let categoryWAT=false;
    let categoryACC=false;
    let categoryOBA=false;
    let categorySPP=false;
    let categorySalesSTO=false;
    let categorySalesJLY=false;
    let categorySalesWAT=false;
    let categorySalesACC=false;
    let categorySalesOBA=false;
    let categorySalesSPP=false;
    let salesChannelValue = [];

    checkbits.map(function(value,key){
        switch (numberDiit) {
            case 1:
                productGroupJLY = (value == '1')?true:false;
                break;
            case 2:
                if(key == 0){
                    productGroupWAT = (value == '1')?true:false;
                }else if (key == 1) {
                    productGroupJLY = (value == '1')?true:false;
                }
                break;
            case 3:
                if(key == 0){
                    productGroupSTO = (value == '1')?true:false;
                }else if (key == 1) {
                    productGroupWAT = (value == '1')?true:false;
                }else if (key == 2) {
                    productGroupJLY = (value == '1')?true:false;
                }
                break;
            case 4:
                if(key == 0){
                    productGroupACC = (value == '1')?true:false;
                }else if (key == 1) {
                    productGroupSTO = (value == '1')?true:false;
                }else if (key == 2) {
                    productGroupWAT = (value == '1')?true:false;
                }else if (key == 3) {
                    productGroupJLY = (value == '1')?true:false;
                }
                break;
            case 5:
                if(key == 0){
                    productGroupOBA = (value == '1')?true:false;
                }else if (key == 1) {
                    productGroupACC = (value == '1')?true:false;
                }else if (key == 2) {
                    productGroupSTO = (value == '1')?true:false;
                }else if (key == 3) {
                    productGroupWAT = (value == '1')?true:false;
                }else if (key == 4) {
                    productGroupJLY = (value == '1')?true:false;
                }
                break;
            case 6:
                if(key == 0){
                    productGroupSPA = (value == '1')?true:false;
                }else if (key == 1) {
                    productGroupOBA = (value == '1')?true:false;
                }else if (key == 2) {
                    productGroupACC = (value == '1')?true:false;
                }else if (key == 3) {
                    productGroupSTO = (value == '1')?true:false;
                }else if (key == 4) {
                    productGroupWAT = (value == '1')?true:false;
                }else if (key == 5) {
                    productGroupJLY = (value == '1')?true:false;
                }
                break;
          default:
            break;
        }
    });
    checkbitsSales.map(function(value,key){
        switch (numberDiitSales) {
            case 1:
                productGroupSalesJLY = (value == '1')?true:false;
                break;
            case 2:
                if(key == 0){
                    productGroupSalesWAT = (value == '1')?true:false;
                }else if (key == 1) {
                    productGroupSalesJLY = (value == '1')?true:false;
                }
                break;
            case 3:
                if(key == 0){
                    productGroupSalesSTO = (value == '1')?true:false;
                }else if (key == 1) {
                    productGroupSalesWAT = (value == '1')?true:false;
                }else if (key == 2) {
                    productGroupSalesJLY = (value == '1')?true:false;
                }
                break;
            case 4:
                if(key == 0){
                    productGroupSalesACC = (value == '1')?true:false;
                }else if (key == 1) {
                    productGroupSalesSTO = (value == '1')?true:false;
                }else if (key == 2) {
                    productGroupSalesWAT = (value == '1')?true:false;
                }else if (key == 3) {
                    productGroupSalesJLY = (value == '1')?true:false;
                }
                break;
            case 5:
                if(key == 0){
                    productGroupSalesOBA = (value == '1')?true:false;
                }else if (key == 1) {
                    productGroupSalesACC = (value == '1')?true:false;
                }else if (key == 2) {
                    productGroupSalesSTO = (value == '1')?true:false;
                }else if (key == 3) {
                    productGroupSalesWAT = (value == '1')?true:false;
                }else if (key == 4) {
                    productGroupSalesJLY = (value == '1')?true:false;
                }
                break;
            case 6:
                if(key == 0){
                    productGroupSalesSPA = (value == '1')?true:false;
                }else if (key == 1) {
                    productGroupSalesOBA = (value == '1')?true:false;
                }else if (key == 2) {
                    productGroupSalesACC = (value == '1')?true:false;
                }else if (key == 3) {
                    productGroupSalesSTO = (value == '1')?true:false;
                }else if (key == 4) {
                    productGroupSalesWAT = (value == '1')?true:false;
                }else if (key == 5) {
                    productGroupSalesJLY = (value == '1')?true:false;
                }
                break;
          default:
            break;
        }
    });
    checkbitsPriceSales.map(function(value,key){
        switch (numberDiitPriceSales) {
            case 1:
                priceSalesRTP = (value == '1')?true:false;
                break;
            case 2:
                if(key == 0){
                    priceSalesUCP = (value == '1')?true:false;
                }else if (key == 1) {
                    priceSalesRTP = (value == '1')?true:false;
                }
                break;
            case 3:
                if(key == 0){
                    priceSalesCTP = (value == '1')?true:false;
                }else if (key == 1) {
                    priceSalesUCP = (value == '1')?true:false;
                }else if (key == 2) {
                    priceSalesRTP = (value == '1')?true:false;
                }
                break;
            case 4:
                if(key == 0){
                    priceSalesNSP = (value == '1')?true:false;
                }else if (key == 1) {
                    priceSalesCTP = (value == '1')?true:false;
                }else if (key == 2) {
                    priceSalesUCP = (value == '1')?true:false;
                }else if (key == 3) {
                    priceSalesRTP = (value == '1')?true:false;
                }
                break;
            case 5:
                if(key == 0){
                    priceSalesMGP = (value == '1')?true:false;
                }else if (key == 1) {
                    priceSalesNSP = (value == '1')?true:false;
                }else if (key == 2) {
                    priceSalesCTP = (value == '1')?true:false;
                }else if (key == 3) {
                    priceSalesUCP = (value == '1')?true:false;
                }else if (key == 4) {
                    priceSalesRTP = (value == '1')?true:false;
                }
                break;
            case 6:
                if(key == 0){
                    priceSalesDSP = (value == '1')?true:false;
                }else if (key == 1) {
                    priceSalesMGP = (value == '1')?true:false;
                }else if (key == 2) {
                    priceSalesNSP = (value == '1')?true:false;
                }else if (key == 3) {
                    priceSalesCTP = (value == '1')?true:false;
                }else if (key == 4) {
                    priceSalesUCP = (value == '1')?true:false;
                }else if (key == 5) {
                    priceSalesRTP = (value == '1')?true:false;
                }
                break;
          default:
            break;
        }
    });
    checkbitsCategory.map(function(value,key){
        switch (numberDiitCategory) {
            case 1:
                categoryJLY = (value == '1')?true:false;
                break;
            case 2:
                if(key == 0){
                    categoryWAT = (value == '1')?true:false;
                }else if (key == 1) {
                    categoryJLY = (value == '1')?true:false;
                }
                break;
            case 3:
                if(key == 0){
                    categorySTO = (value == '1')?true:false;
                }else if (key == 1) {
                    categoryWAT = (value == '1')?true:false;
                }else if (key == 2) {
                    categoryJLY = (value == '1')?true:false;
                }
                break;
            case 4:
                if(key == 0){
                    categoryACC = (value == '1')?true:false;
                }else if (key == 1) {
                    categorySTO = (value == '1')?true:false;
                }else if (key == 2) {
                    categoryWAT = (value == '1')?true:false;
                }else if (key == 3) {
                    categoryJLY = (value == '1')?true:false;
                }
                break;
            case 5:
                if(key == 0){
                    categoryOBA = (value == '1')?true:false;
                }else if (key == 1) {
                    categoryACC = (value == '1')?true:false;
                }else if (key == 2) {
                    categorySTO = (value == '1')?true:false;
                }else if (key == 3) {
                    categoryWAT = (value == '1')?true:false;
                }else if (key == 4) {
                    categoryJLY = (value == '1')?true:false;
                }
                break;
            case 6:
                if(key == 0){
                    categorySPP = (value == '1')?true:false;
                }else if (key == 1) {
                    categoryOBA = (value == '1')?true:false;
                }else if (key == 2) {
                    categoryACC = (value == '1')?true:false;
                }else if (key == 3) {
                    categorySTO = (value == '1')?true:false;
                }else if (key == 4) {
                    categoryWAT = (value == '1')?true:false;
                }else if (key == 5) {
                    categoryJLY = (value == '1')?true:false;
                }
                break;
            default:
                break;
        }
    });
    checkbitsSalesCategory.map(function(value,key){
        switch (numberDiitSalesCategory) {
            case 1:
                categorySalesJLY = (value == '1')?true:false;
                break;
            case 2:
                if(key == 0){
                    categorySalesWAT = (value == '1')?true:false;
                }else if (key == 1) {
                    categorySalesJLY = (value == '1')?true:false;
                }
                break;
            case 3:
                if(key == 0){
                    categorySalesSTO = (value == '1')?true:false;
                }else if (key == 1) {
                    categorySalesWAT = (value == '1')?true:false;
                }else if (key == 2) {
                    categorySalesJLY = (value == '1')?true:false;
                }
                break;
            case 4:
                if(key == 0){
                    categorySalesACC = (value == '1')?true:false;
                }else if (key == 1) {
                    categorySalesSTO = (value == '1')?true:false;
                }else if (key == 2) {
                    categorySalesWAT = (value == '1')?true:false;
                }else if (key == 3) {
                    categorySalesJLY = (value == '1')?true:false;
                }
                break;
            case 5:
                if(key == 0){
                    categorySalesOBA = (value == '1')?true:false;
                }else if (key == 1) {
                    categorySalesACC = (value == '1')?true:false;
                }else if (key == 2) {
                    categorySalesSTO = (value == '1')?true:false;
                }else if (key == 3) {
                    categorySalesWAT = (value == '1')?true:false;
                }else if (key == 4) {
                    categorySalesJLY = (value == '1')?true:false;
                }
                break;
            case 6:
                if(key == 0){
                    categorySalesSPP = (value == '1')?true:false;
                }else if (key == 1) {
                    categorySalesOBA = (value == '1')?true:false;
                }else if (key == 2) {
                    categorySalesACC = (value == '1')?true:false;
                }else if (key == 3) {
                    categorySalesSTO = (value == '1')?true:false;
                }else if (key == 4) {
                    categorySalesWAT = (value == '1')?true:false;
                }else if (key == 5) {
                    categorySalesJLY = (value == '1')?true:false;
                }
                break;
            default:
                break;
        }
    });
    user = {...user,
        price: permission.price,
        userType: permission.userType,
        categoryJLY: categoryJLY,
        categoryWAT: categoryWAT,
        categorySTO: categorySTO,
        categoryACC: categoryACC,
        categoryOBA: categoryOBA,
        categorySPP: categorySPP,
        categorySalesJLY: categorySalesJLY,
        categorySalesWAT: categorySalesWAT,
        categorySalesSTO: categorySalesSTO,
        categorySalesACC: categorySalesACC,
        categorySalesOBA: categorySalesOBA,
        categorySalesSPP: categorySalesSPP,
        productGroup: (permission.productGroup == 63)?1:2,
        productGroupSTO: productGroupSTO,
        productGroupJLY: productGroupJLY,
        productGroupWAT: productGroupWAT,
        productGroupACC: productGroupACC,
        productGroupOBA: productGroupOBA,
        productGroupSPA: productGroupSPA,
        productGroupSales: (permission.productGroupSales == 63)?1:2,
        productGroupSalesSTO: productGroupSalesSTO,
        productGroupSalesJLY: productGroupSalesJLY,
        productGroupSalesWAT: productGroupSalesWAT,
        productGroupSalesACC: productGroupSalesACC,
        productGroupSalesOBA: productGroupSalesOBA,
        productGroupSalesSPA: productGroupSalesSPA,
        priceSalesRTP: priceSalesRTP,
        priceSalesUCP: priceSalesUCP,
        priceSalesCTP: priceSalesCTP,
        priceSalesNSP: priceSalesNSP,
        priceSalesMGP: priceSalesMGP,
        priceSalesDSP: priceSalesDSP,
        onhandLocation: (permission.onhandLocation != null) ? (permission.onhandLocation.type.indexOf('All') != -1) ? true : false : false,
        onhandWarehouse: (permission.onhandWarehouse != null) ? (permission.onhandWarehouse != null && permission.onhandWarehouse.type.indexOf('AllWarehouse') != -1) ? true : false : false,
        onhandAll: (permission.onhandLocation != null) ? (permission.onhandLocation.type.indexOf('All') != -1) ? true : false : false,
        permissionId: permission.id,
        onhandLocationValue: (permission.onhandLocation != null) ? permission.onhandLocation.places : null,
        onhandWarehouseValue: (permission.onhandWarehouse != null) ? permission.onhandWarehouse.places : null,
        salesLocation: (permission.salesLocation != null) ? (permission.salesLocation.type.indexOf('All') != -1) ? true : false : false,
        salesChannel: (permission.salesChannel != null) ? (permission.salesChannel.type.indexOf('All') != -1) ? true : false : false,
        salesWarehouse: (permission.salesWarehouse != null) ? (permission.salesWarehouse != null && permission.salesWarehouse.type.indexOf('AllSalesWarehouse') != -1) ? true : false : false,
        salesAll: (permission.salesLocation != null) ? (permission.salesLocation.type.indexOf('All') != -1) ? true : false : false,
        salesLocationValue: (permission.salesLocation != null) ? permission.salesLocation.places : null,
        salesWarehouseValue: (permission.salesWarehouse != null) ? permission.salesWarehouse.places : null,
        salesChannelValue: (permission.salesChannel != null) ? permission.salesChannel.places : null,
        notUseHierarchy: JSON.parse(permission.notUseHierarchy),
        notUseSalesHierarchy: JSON.parse(permission.notUseSalesHierarchy),
        bomOnhand: permission.bomOnhand,
        bomSales: permission.bomSales
    }
    return user
}
const findstatusupdate = (state, status,action) => {
    switch (action.type) {
        case 'DISABLE_USER':
            if (state.id !== status.id) {
              return state
            }
            return {...state,status: status.status}
        default:
            return state
    }
}
