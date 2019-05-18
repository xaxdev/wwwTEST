import { 
    FETCH_ALL_RELATED_ITEMS, SET_RELATEDITEM, ADD_RELATED_ITEMS, SET_RELATEDITEM_SOURCE, SET_RELATEDITEM_ID, FETCH_RELATED_ITEM_ID, 
    EDIT_RELATED_ITEM, DELETE_RELATED_ITEM, SET_RELATEDITEM_SELECTED, FETCH_EXPORT_RELATE_ITEMS
 } from '../../constants/relatedItemConstants'

const INITIAL_STATE = {
    listAllRelatedItem: null, relatedItemEdit: null, totalPages: null, relatedItem:[], relatedItemSource:[], relatedItemId: null, message: null, 
    statusCode: null, relatedItemSelected: null, listPageRelatedItem: null
}

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case FETCH_EXPORT_RELATE_ITEMS :  
            return {
                ...state
            }
            // return {
            //     ...state, listPageRelatedItem: action.data.relatedItem, totalPages: Math.ceil(action.data.countAll/action.size), 
            //     message: action.data.message, statusCode: action.data.statusCode, listAllRelatedItem: action.data.allRelatedItem
            // };
            break;
        case SET_RELATEDITEM_SELECTED :  
            return {...state, relatedItemSelected: action.relatedItemSelected }
            break;
        case DELETE_RELATED_ITEM:
            return {
                ...state, listPageRelatedItem: action.data.relatedItem, totalPages: Math.ceil(action.data.countAll/action.size), 
                message: action.data.message, statusCode: action.data.statusCode, listAllRelatedItem: action.data.allRelatedItem
            };
            break;
        case EDIT_RELATED_ITEM:
            return {
                ...state, listPageRelatedItem: action.data.relatedItem, totalPages: Math.ceil(action.data.countAll/action.size), 
                message: action.data.message, statusCode: action.data.statusCode, listAllRelatedItem: action.data.allRelatedItem
            };
            break;
        case FETCH_RELATED_ITEM_ID :            
            return {...state, relatedItemEdit: action.data.relatedItem,message: action.data.message, statusCode: action.data.statusCode }
            break;
        case SET_RELATEDITEM_ID :
            return {...state, relatedItemId: action.relatedItemId};
            break;
        case SET_RELATEDITEM_SOURCE :
            return {...state, relatedItemSource: action.relatedItemSource};
            break;
        case ADD_RELATED_ITEMS:
            return {
                ...state, listPageRelatedItem: action.data.relatedItem, totalPages: Math.ceil(action.data.countAll/action.size), 
                message: action.data.message, statusCode: action.data.statusCode, listAllRelatedItem: action.data.allRelatedItem
            };
            break;
        case SET_RELATEDITEM :
            return {...state, relatedItem: action.relatedItem};
            break;
        case FETCH_ALL_RELATED_ITEMS :
            return {
                ...state, listPageRelatedItem: action.data.relatedItem, totalPages: Math.ceil(action.data.countAll/action.size), 
                listAllRelatedItem: action.data.allRelatedItem, message: action.data.message, statusCode: action.data.statusCode
            }
            break;
        default:
            return {...state};
    }
}