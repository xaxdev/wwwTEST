import 'babel-polyfill'; // required for async

import * as migration from './lib/migration/';

migration
    .migrate()
    .then(_ => {})
    .catch(err => {
        console.log(err);
    });
