'use strict';

require('babel-register');
require('babel-polyfill');
require('./src/app');


// const Confidence = require('confidence');
// const Glue = require('glue');
// const Hoek = require('hoek');
//
// const internals = {};
//
// internals.store = new Confidence.Store(require('./config'));
// // console.log(process.env.NODE_ENV);
// // console.log(internals.store.get('/', { env: process.env.NODE_ENV || 'development' }));
// internals.manifest = internals.store.get('/', { env: process.env.NODE_ENV || 'development' });
// internals.options = {
//   relativeTo: __dirname
// };
//
// // console.log(internals.manifest.connections);
// // console.log(internals.options);
//
// internals.init = () => {
//
//   server.start(() => {
//
//     var rabbit = server.plugins['hapi-rabbit'];
//     rabbit.createContext(function(err, context){
//         if(err){
//             console.log('err', err);
//         }
//
//         rabbit.subscribe(context, 'exchange', function(err, message){
//             console.log('message', message);
//         });
//     });
//
//     console.log('Servers are started');
//   });
// };
//
// internals.init();
