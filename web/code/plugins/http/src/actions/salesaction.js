import 'babel-polyfill';
import fetch from 'isomorphic-fetch';

import {
    SET_SALESCHANNEL, SET_SUBMITACTION, RESET_FORM
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
