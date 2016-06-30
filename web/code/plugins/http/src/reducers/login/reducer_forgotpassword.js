const INITIAL_STATE = {  forgotstatus: false,forgotdata: null,msg:''};

export default function(state = INITIAL_STATE, action){

  switch(action.type){
  case 'FORGOTPASSWORD_USER':
    return {...state, forgotstatus: (action.data.statusCode >= 400) ? false : true,
      forgotdata:(action.data.statusCode >= 400) ? null : action.data.data,
      msg:(action.data.statusCode >= 400) ? action.data.message : action.data.message};
  case 'CLEARFORGOTPASSWORD_USER':
    return {...INITIAL_STATE};
  default:
    return {...state};
  }
}
