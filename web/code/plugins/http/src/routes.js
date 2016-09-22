import React from 'react';
import {
    Route,
    IndexRoute
} from 'react-router';

if (typeof require.ensure !== 'function') require.ensure = function(d, c) {
    c(require);
};

export default ({ dispatch,getState}) => {

    const requireAuth = (nextState, replace) => {
      const token = sessionStorage.token;
      if (!token) {
        replace({
          pathname: '/',
          state: { nextPathname: nextState.location.pathname }
        })
      }
    };

    const  requireAccess = (nextState, replace) => {
      const token = sessionStorage.token;
      if (!token) {
        replace({
          pathname: '/',
          state: { nextPathname: nextState.location.pathname }
        })
      } else {
        const { role } = JSON.parse(sessionStorage.logindata);
        if( role != 'Admin'){
          replace({
            pathname: '/accessdenied',
            state: { nextPathname: nextState.location.pathname }
          })
        }
      }
    };
    return {
        component: 'div',
        childRoutes: [{
            path: '/',
            component: require('./containers/app'),
            indexRoute: {
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/login/login'));
                    }, 'login');
                }
            },
            childRoutes: [{
                onEnter: requireAuth,
                path: 'inventories',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/inventory/inventory_main_search'));
                    }, 'inventories');
                }
            }, {
                onEnter: requireAccess,
                path: 'users',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/user/users_list'));
                    }, 'users');
                }
            }, {
                onEnter: requireAccess,
                path: 'user/new',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/user/users_new'));
                    }, 'usernew');
                }
            }, {
                onEnter: requireAccess,
                path: 'user/:id',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/user/users_details'));
                    }, 'usersdetail');
                }
            }, {
                path: 'forgotpassword',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/login/forgotpassword'));
                    }, 'forgotpassword');
                }
            }, {
                path: 'resetpassword/:token',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/login/resetpassword'));
                    }, 'resetpassword');
                }
            }, {
                onEnter: requireAuth,
                path: 'searchresult',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/searchresults/search_reslts'));
                    }, 'searchresult');
                }
            }, {
                onEnter: requireAuth,
                path: 'productdetail/:id',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/products/productdetail'));
                    }, 'productdetail');
                }
            }, {
                onEnter: requireAuth,
                path: '/productreletedetail/:id',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/products/productreletedetail'));
                    }, 'productreletedetail');
                }
            }, {
                path: 'changepassword',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/login/changepassword'));
                    }, 'changepassword');
                }
            }, {
                path: 'accessdenied',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/accessdenied'));
                    }, 'accessdenied');
                }
            }, {
                path: '*',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/notfound'));
                    }, 'notfound');
                },
                status: 404
            }]
        }]
    };
};
