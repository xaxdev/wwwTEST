import 'babel-polyfill'; // required for async
import { CronJob } from 'cron';
import moment from 'moment-timezone';
import sendgrid from 'sendgrid'
import config from '../sendgrid.json'
import * as migration from './lib/migration/';

const index = `mol_${moment().format('YYYYMMDD_HHmm')}`;
const name = 'mol';
const time = moment().tz('Asia/Bangkok').format()

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
    const subject = (!!err)? `Failed to migrate data to ES at ${time}` : `Succeeded in migrating data to ES at ${time}`
    const sg = sendgrid(config.key)
    const request = sg.emptyRequest()

    request.method = 'POST'
    request.path = '/v3/mail/send'
    request.body = {
        personalizations: [
            {
                to: [
                    {
                        email: 'mol@itorama.com'
                    }
                ],
                subject
            }
        ],
        from: {
            email: 'dev@itorama.com'
        },
        content: [
            {
                type: 'text/plain',
                value: (!!err)? err.message : subject
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
  cronTime: '00 00 5 * * *',
  onTick: _ => {
    init()
        .then(_ => {
            console.log(`Migration is done at: ${time}`)
        })
        .catch(err => {
            return err
        })
        .then(value => {
            notify(value)
        });
  },
  start: true,
  timeZone: 'Asia/Bangkok'
});
