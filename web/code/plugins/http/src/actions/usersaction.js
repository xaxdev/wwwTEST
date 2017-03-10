import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import {ROOT_URL,FETCH_USERS,CREATE_USER,FETCH_USER,UPDATE_USER,
  DELETE_USER,DISABLE_USER,SET_SHAREEMAILTO,FETCH_SHAREUSERS} from '../constants/userConstants';

export function fetchShareUsers(){
    const token = sessionStorage.token;
    return {
    		type: FETCH_SHAREUSERS,
    		promise: fetch(`${ROOT_URL}users/shareuser`,{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': token
            },
          })
    	}
}

export function setDataSendEmailTo(value){
    return {
            type: SET_SHAREEMAILTO,
            shareEmailTo:value
    }
}

export function fetchUsers(){
  const token = sessionStorage.token;
  return {
		type: FETCH_USERS,
		promise: fetch(`${ROOT_URL}users`,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
	}
}

export function createUser(props){

  const token = sessionStorage.token;

  return {
    type: CREATE_USER,
        		promise: fetch(`${ROOT_URL}users`,{
              method: 'PUT',
              body: JSON.stringify(props),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
              },
    })
	}

}

export function fetchUser(id){
  const token = sessionStorage.token;
  return {
    type: FETCH_USER,
        		promise: fetch(`${ROOT_URL}users/${id}`,{
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
              },
    })
	}
}

export function updateUser(props){
  const token = sessionStorage.token;

  return {
    type: UPDATE_USER,
            promise: fetch(`${ROOT_URL}users/${props.id}`,{
              method: 'POST',
              body: JSON.stringify(props),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
              },
    })
  }
}

export function disableUser(id,status = true){
  const token = sessionStorage.token;
  return {
    type: DISABLE_USER,
    promise: fetch(`${ROOT_URL}users/${id}`,{
              method: 'POST',
              body: JSON.stringify({'status': status}),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
              },

    })
  }
}
