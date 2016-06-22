import 'babel-polyfill'; // required for async
import moment from 'moment-timezone';

import * as migration from './lib/migration/';

const index = `mol_${moment().format('YYYYMMDD')}`;

migration
    .migrate(index)
    .then(_ => {})
    .catch(err => {
        console.log(err);
    });
