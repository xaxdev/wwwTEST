import 'babel-polyfill'; // required for async
import { CronJob } from 'cron';
import moment from 'moment-timezone';

import * as migration from './lib/migration/';

const previous = `mol_${moment().add(-1, 'days').format('YYYYMMDD')}`;
const index = `mol_${moment().format('YYYYMMDD')}`;
const name = 'mol';

const init = async _ => {
    try {
        console.log(`Start migrating data at: ${moment().tz('Asia/Bangkok').format('HH:mm:ss')}`);
        await migration.migrate(index);
        await migration.alias(index, previous, name);
    } catch (err) {
        throw err;
    }
};

new CronJob({
  cronTime: '00 20 11 * * *',
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
