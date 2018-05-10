const INITIAL_STATE = {
    datas:[], user: null, options:[], errors: null, statuscode: null, selectedCompany:null, selectedWarehouses:null, statusCode:null, message:null,
    locationOnHand:[],warehouseOnHand:[],onhandLocationSelected:null,ShareEmailToValue:[],canNotUseHierarchy:null
};

export default function(state = INITIAL_STATE, action){
    switch(action.type){
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
            return { ...state, user: setnewprops(action.data.data)};
        case 'FETCH_USERS':
            return { ...state, datas: action.data.data };
        case 'FETCH_OPTIONS':
            return { ...state, options: action.data, locationOnHand: action.data.companies, warehouseOnHand: action.data.warehouses };
        case 'SELECTED_COMPANY':
            return { ...state, options: action.data, selectedCompany: action.selected, selectedWarehouses: ''};
        case 'SELECTED_WAREHOUSES':
            return { ...state, options: action.data, selectedCompany: action.comid, selectedWarehouses: action.selected};
        case 'GED_ONHANDWAREHOUSES':
            return { ...state, options: action.data, locationOnHand: action.data.companies, warehouseOnHand: action.data.warehouses};
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
    let bitwiseCategory = Number(permission.category).toString(2);
    let checkbits = bitwise.split('');
    let checkbitsCategory = bitwiseCategory.split('');
    let numberDiit = checkbits.length;
    let numberDiitCategory = checkbitsCategory.length;
    let productGroupSTO=false;
    let productGroupJLY=false;
    let productGroupWAT=false;
    let productGroupACC=false;
    let productGroupOBA=false;
    let productGroupSPA=false;
    let onhandLocationValue = [];
    let categorySTO=false;
    let categoryJLY=false;
    let categoryWAT=false;
    let categoryACC=false;
    let categoryOBA=false;
    let categorySPP=false;

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
    user = {...user,
        price: permission.price,
        userType: permission.userType,
        categoryJLY: categoryJLY,
        categoryWAT: categoryWAT,
        categorySTO: categorySTO,
        categoryACC: categoryACC,
        categoryOBA: categoryOBA,
        categorySPP: categorySPP,
        productGroup: (permission.productGroup == 63)?1:2,
        productGroupSTO: productGroupSTO,
        productGroupJLY: productGroupJLY,
        productGroupWAT: productGroupWAT,
        productGroupACC: productGroupACC,
        productGroupOBA: productGroupOBA,
        productGroupSPA: productGroupSPA,
        onhandLocation: (permission.onhandLocation != null) ? (permission.onhandLocation.type.indexOf('All') != -1) ? true : false : false,
        onhandWarehouse: (permission.onhandWarehouse != null) ? (permission.onhandWarehouse != null && permission.onhandWarehouse.type.indexOf('AllWarehouse') != -1) ? true : false : false,
        onhandAll: (permission.onhandLocation != null) ? (permission.onhandLocation.type.indexOf('All') != -1) ? true : false : false,
        permissionId: permission.id,
        onhandLocationValue: (permission.onhandLocation != null) ? permission.onhandLocation.places : null,
        onhandWarehouseValue: (permission.onhandWarehouse != null) ? permission.onhandWarehouse.places : null,
        notUseHierarchy: JSON.parse(permission.notUseHierarchy)
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
