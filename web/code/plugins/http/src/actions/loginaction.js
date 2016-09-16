import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import { ROOT_URL,LOGIN_USER,LOGOUT_USER,RESETPASSWORD_USER,VALIDATE_USER,CHANGEPASSWORD_USER } from '../constants/userConstants';

export function login(props){
  return {
          type: LOGIN_USER,
    		  promise: fetch(`${ROOT_URL}users/login`,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(props)
          })
	}
}

export function logout(){
  return {
          type: LOGOUT_USER
        }
}

export function validatetokenreset(token){
  return {
          type: VALIDATE_USER,
    		  promise: fetch(`${ROOT_URL}users/reset/${token}`,{
          method: 'GET'
        })
  }
}

export function sendreset(props){
  const token = sessionStorage.token;
  return {
          type: RESETPASSWORD_USER,
    		  promise: fetch(`${ROOT_URL}users/reset`,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify(props)
          })
	}
}
export function setChangePasswordStatus(value){
  return {
          type: SET_SORTDIRECTION,
          changePasswordStatus: value
  }
}
