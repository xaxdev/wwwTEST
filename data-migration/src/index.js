import 'babel-polyfill'; // required for async
import { CronJob } from 'cron';
import moment from 'moment-timezone';

import * as migration from './lib/migration/';

const index = `mol_${moment().format('YYYYMMDD_HHmm')}`;
const name = 'mol';

const init = async _ => {
    try {
        console.log(`Start migrating data at: ${moment().tz('Asia/Bangkok').format('HH:mm:ss')}`);
        await migration.migrate(index);
        await migration.alias(index, name);
    } catch (err) {
        throw err;
    }
};

new CronJob({
  cronTime: '00 35 15 * * *',
  // cronTime: '00 */5 * * * *',
  onTick: _ => {
    init()
        .then(_ => {
            console.log(`Migration is done at: ${moment().tz('Asia/Bangkok').format('HH:mm:ss')}`);
        })
        .catch(err => {
            console.log(err);
        });
  },
  start: true,
  timeZone: 'Asia/Bangkok'
});
