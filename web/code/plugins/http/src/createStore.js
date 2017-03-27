import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import promiseResolver from './middlewares/promiseResolver';
import masterDataResolver from './middlewares/masterDataResolver';
import createLogger from 'redux-logger';

export default function(initialState = {}) {

	const middlewares = [promiseResolver,masterDataResolver]

	// if(ENVIRONMENT !== 'production')
    // 	middlewares.push(createLogger())

	return createStore(reducer, initialState, applyMiddleware(...middlewares));
}
