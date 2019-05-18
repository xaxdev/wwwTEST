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
    const  requirePermissionInventory = (nextState, replace) => {
        const token = sessionStorage.token;
        if (!token) {
            replace({
                pathname: '/',
                state: { nextPathname: nextState.location.pathname }
            })
        } else {
            const { role, permission } = JSON.parse(sessionStorage.logindata);
            if (role != 'Admin') {
                if( permission.userType != 'OnHand' && permission.userType != 'All' ){
                    replace({
                        pathname: '/accessdenied',
                        state: { nextPathname: nextState.location.pathname }
                    })
                }
            }
        }
    };
    const  requirePermissionSalesReport = (nextState, replace) => {
        const token = sessionStorage.token;
        if (!token) {
            replace({
                pathname: '/',
                state: { nextPathname: nextState.location.pathname }
            })
        } else {
            const { role, permission } = JSON.parse(sessionStorage.logindata);
            if (role != 'Admin') {
                if( permission.userType != 'Sales' && permission.userType != 'All' ){
                    replace({
                        pathname: '/accessdenied',
                        state: { nextPathname: nextState.location.pathname }
                    })
                }
            }
        }
    };
    const  requirePermissionRelatedItem = (nextState, replace) => {
        const token = sessionStorage.token;
        if (!token) {
            replace({
                pathname: '/',
                state: { nextPathname: nextState.location.pathname }
            })
        } else {
            const { role, permission } = JSON.parse(sessionStorage.logindata);

            if (!permission.relatedItemOnhand) {
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
                onEnter: requirePermissionInventory,
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
                onEnter: requirePermissionInventory,
                path: 'searchresult',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/searchresults/search_reslts'));
                    }, 'searchresult');
                }
            }, {
                onEnter: requirePermissionInventory,
                path: 'productdetail/:id',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/products/productdetail'));
                    }, 'productdetail');
                }
            },{
                onEnter: requirePermissionInventory,
                path: 'setdetail/:id',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/products/setdetail'));
                    }, 'setdetail');
                }
            },{
                onEnter: requirePermissionInventory,
                path: 'setdetailmycatalog/:id',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/products/setdetailmycatalog'));
                    }, 'setdetailmycatalog');
                }
            }, {
                onEnter: requirePermissionInventory,
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
                onEnter: requirePermissionInventory,
                path: 'mycatalog',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/mycatalog/mycatalog_list'));
                    }, 'mycatalog');
                }
            }, {
                onEnter: requirePermissionInventory,
                path: '/productmycatalog/:id',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/products/productmycatalog'));
                    }, 'productmycatalog');
                }
            },{
                onEnter: requireAuth,
                path: 'whatnewnotification',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/whatnewnotification/whatnewnotification'));
                    }, 'whatnewnotification');
                }
            }, {
                onEnter: requireAuth,
                path: 'savesearch',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/savesearch/list'));
                    }, 'savesearch');
                }
            }, {
                onEnter: requirePermissionInventory,
                path: 'setcatalog',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/setcatalog/setcatalog_list'));
                    }, 'mycatalog');
                }
            },{
                onEnter: requirePermissionInventory,
                path: 'setdetailsetcatalog/:id',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/products/setdetailsetcatalog'));
                    }, 'setdetailsetcatalog');
                }
            },{
                onEnter: requirePermissionSalesReport,
                path: 'salesreport',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/salesreport/sales_report'));
                    }, 'salesreport');
                }
            },{
                onEnter: requirePermissionSalesReport,
                path: 'salessearchresult',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/salessearchresult/sales_search_result'));
                    }, 'salessearchresult');
                }
            },{
                onEnter: requirePermissionSalesReport,
                path: 'salesproductdetail/:id',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/salesproducts/salesproductdetail'));
                    }, 'salesproductdetail');
                }
            },{
                onEnter: requirePermissionSalesReport,
                path: 'setsalesdetail/:id',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/salesproducts/setsalesdetail'));
                    }, 'setsalesdetail');
                }
            }, {
                onEnter: requirePermissionSalesReport,
                path: '/salesproductreletedetail/:id',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/salesproducts/salesproductreletedetail'));
                    }, 'salesproductreletedetail');
                }
            },{
                onEnter: requirePermissionRelatedItem,
                path: 'relateditem',
                getComponent: (location, cb) => {
                    require.ensure([], (require) => {
                        cb(null, require('./containers/relateditem/relateditem_main'));
                    }, 'relateditem');
                }
            },{
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
