import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import {
    SET_SALESCHANNEL, SET_SUBMITACTION, RESET_FORM, SET_CUSTOMER_SEARCH, SET_CUSTOMER_TYPE
} from '../constants/inventoryConstants';

export function setDataSalesChannel(value){
    return {
        type: SET_SALESCHANNEL,
        salesChannel:value
    }
}

export function setSubmitAction(value){
    return {
        type: SET_SUBMITACTION,
        submitActionValue: value
    }
}

export function resetForm(){
    return {
        type: RESET_FORM
    }
}

export function setCustomerType(value){
    return {
        type: SET_CUSTOMER_TYPE,
        customerType: value
    }
}

export function setCustomerSearch(value){
    return {
        type: SET_CUSTOMER_SEARCH,
        customer: value
    }
}
