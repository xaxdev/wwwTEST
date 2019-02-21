import React from 'react';
import ReactDOM from 'react-dom';
import { match, Router, browserHistory, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createBrowserHistory from '../../../node_modules/history/lib/createBrowserHistory';
const appHistory = useRouterHistory(createBrowserHistory)();
import getRoutes from './routes';
import { Provider } from 'react-redux';
import createStore from './createStore';
import '../public/css/style.css';

const store = createStore(window.__INITIAL_STATE__);
const history = syncHistoryWithStore(appHistory, store);

const routes = getRoutes(store);
const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;

const Root = <Router routes={routes} history={history} />;

const dest = document.querySelector('.body-wrapper')
match({ routes, location }, () => {
    ReactDOM.render(
        <Provider store={store} key="provider">
            { Root }
        </Provider>
        , dest
    )
})
