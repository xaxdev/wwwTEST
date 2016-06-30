import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import { ROOT_URL,FORGOTPASSWORD_USER,CLEARFORGOTPASSWORD_USER } from '../constants/userConstants';

export function forgotpassword(email){
  return {
		type: FORGOTPASSWORD_USER,
		promise: fetch(`${ROOT_URL}users/forgot`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(email)
    })
	}
}
export function clearforgotpassword(){
  return {
          type: CLEARFORGOTPASSWORD_USER
        }
}
