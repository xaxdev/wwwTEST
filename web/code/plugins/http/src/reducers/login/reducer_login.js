import { LOGIN_USER,LOGOUT_USER,RESETPASSWORD_USER,VALIDATE_USER,CHANGEPASSWORD_USER } from '../../constants/userConstants';
const INITIAL_STATE = {  loginstatus: false,logindata: null,msg:'',changePasswordStatus:false};
export default function(state = INITIAL_STATE, action){

  switch(action.type){
  case LOGIN_USER:

    if(action.data){
            sessionStorage.setItem('logindata', JSON.stringify(action.data));
    }
    return {...state, loginstatus: (action.data.statusCode >= 400) ? false : true,
      logindata:(action.data.statusCode >= 400) ? null : action.data,
      msg:(action.data.statusCode >= 400) ? action.data.message : ''}
  case RESETPASSWORD_USER:
    if(action.data){
      sessionStorage.setItem('logindata', JSON.stringify(action.data.data));
    }
    return {...state, loginstatus: (action.data.statusCode >= 400) ? false : true,
      logindata:(action.data.statusCode >= 400) ? null : action.data.data,
      msg:action.data.message}
  case VALIDATE_USER:
    if(action.data){
      sessionStorage.setItem('logindata', JSON.stringify(action.data));
    }
    return {...state, loginstatus: (action.data.statusCode >= 400) ? false : true,
      logindata:(action.data.statusCode >= 400) ? null : action.data,
      msg:''}
  case LOGOUT_USER:
    sessionStorage.clear();
    return INITIAL_STATE;
  case CHANGEPASSWORD_USER:
    return {...state, changePasswordStatus: action.changePasswordStatus}
  default:
    const token = sessionStorage.getItem('token');
    const logindata = sessionStorage.logindata ? JSON.parse(sessionStorage.logindata) : null;
    return {...state,loginstatus: token ? true : false,
      logindata:token ? logindata : null,
      msg:''};
  }
}
