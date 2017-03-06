const INITIAL_STATE = { datas:[], user: null, options:[], errors: null, statuscode: null, selectedCompany:null
  , selectedWarehouses:null, statusCode:null, message:null,locationOnHand:[],warehouseOnHand:[]
  ,onhandLocationSelected:null,ShareEmailToValue:[]};

export default function(state = INITIAL_STATE, action){

 switch(action.type){
     case 'SET_SHAREEMAILTO':
      // console.log('SET_POLISH -->',action);
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
    // console.log('action.datas-->',action);
    // return { ...state, options: action.data, locationOnHand: action.data.locations, warehouseOnHand: action.data.warehouses };
    return { ...state, options: action.data, locationOnHand: action.data.companies, warehouseOnHand: action.data.warehouses };
  case 'SELECTED_COMPANY':
    // console.log('FETCH_OPTIONS state-->',state);
    // console.log('SELECTED_COMPANY action.data-->',action.data);
    return { ...state, options: action.data, selectedCompany: action.selected, selectedWarehouses: ''};
  case 'SELECTED_WAREHOUSES':
    // console.log('FETCH_OPTIONS state-->',state);
    // console.log('FETCH_OPTIONS action.datas-->',action.datas);
    return { ...state, options: action.data, selectedCompany: action.comid, selectedWarehouses: action.selected};
  case 'GED_ONHANDWAREHOUSES':
    // console.log('GED_ONHANDWAREHOUSES action-->',action);
    // return { ...state, options: action.data, locationOnHand: action.data.locations, warehouseOnHand: action.data.warehouses};
    return { ...state, options: action.data, locationOnHand: action.data.companies, warehouseOnHand: action.data.warehouses};
  case 'CREATE_USER':
    // console.log('action-->',action);
    // console.log('FETCH_OPTIONS action.datas-->',action.datas);
    return { ...state, options: action.datas, selectedWarehouses: action.selected, statusCode: action.data.statusCode,
      message: action.data.message};
  default:
    // console.log('action-->',action);
    return {...state};
  }
}
const setnewprops = (data) => {
  // console.log('setnewprops-->',data);
  var user = data;
  var permission = data.permission;
  var bitwise = Number(permission.productGroup).toString(2);
  var checkbits = bitwise.split('')
  var numberDiit = checkbits.length;
  var productGroupSTO=false;
  var productGroupJLY=false;
  var productGroupWAT=false;
  var productGroupACC=false;
  var productGroupOBA=false;
  var productGroupSPA=false;
  var onhandLocationValue = [];

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
    // console.log(key);
    // console.log(value);
  });

  user = {...user,
    price: permission.price,
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
    onhandWarehouseValue: (permission.onhandWarehouse != null) ? permission.onhandWarehouse.places : null
  }
  // console.log('custom user-->',user);
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
