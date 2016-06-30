import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import promiseResolver from './middlewares/promiseResolver';
import masterDataResolver from './middlewares/masterDataResolver';

export default function(initialState = {}) {
	return createStore(reducer, initialState, applyMiddleware(promiseResolver,masterDataResolver));
}
