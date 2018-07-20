import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import UsersReducer from './user/reducer_users';
import loginReducer from '../reducers/login/reducer_login';
import forgotReducer from '../reducers/login/reducer_forgotpassword';
import { reducer as formReducer } from 'redux-form';
import productdetailReducer from '../reducers/products/reducer_productdetail';
import searchResultReducer from '../reducers/searchresults/reducer_searchresults';
import myCatalogReducer from '../reducers/mycatalog/reducer_mycatalog';

const rootReducer = combineReducers({
    routing: routerReducer,
    users: UsersReducer,
    form: formReducer,
    login:loginReducer,
    forgot:forgotReducer,
    productdetail:productdetailReducer,
    searchResult: searchResultReducer,
    myCatalog: myCatalogReducer
});

export default rootReducer;
