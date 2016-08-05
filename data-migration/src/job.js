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

const notify = err => {
    const sg = sendgrid(config.key)
    const request = sg.emptyRequest()

    request.method = 'POST'
    request.path = '/v3/mail/send'
    request.body = {
        personalizations: [
            {
                to: [
                    {
                        email: 'jittawe@itorama.com'
                    }
                    ,
                    {
                        email: 'korakod.chaisongkram@itorama.com'
                    }
                ],
                subject: `Failed to migrate data to ES at ${moment().tz('Asia/Bangkok').format()}`
            }
        ],
        from: {
            email: 'dev@itorama.com'
        },
        content: [
            {
                type: 'text/plain',
                value: JSON.stringify(err, nulll, 4)
            }
        ]
    };

    sg
        .API(request)
        .then(response => {
            console.log(response.statusCode)
            console.log(response.body)
            console.log(response.headers)
        })
        .catch(err => {
            console.log(err);
        });
};

new CronJob({
  cronTime: '00 52 14 * * *',
  onTick: _ => {
    init()
        .then(_ => {
            console.log(`Migration is done at: ${moment().tz('Asia/Bangkok').format('HH:mm:ss')}`);
        })
        .catch(err => {
            nofity(err);
        });
  },
  start: true,
  timeZone: 'Asia/Bangkok'
});
