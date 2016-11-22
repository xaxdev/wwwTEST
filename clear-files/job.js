import 'babel-polyfill'; // required for async
import { CronJob } from 'cron';
import moment from 'moment-timezone';
import sendgrid from 'sendgrid'
import config from './sendgrid.json'

const fs = require('fs');

const init = async _ => {
    try {
        console.log(`Start clear file at: ${moment().tz('Asia/Bangkok').format('HH:mm:ss')}`);
        await rmDir('../pdf/import_html',false);
        await rmDir('../web/code/plugins/http/public/export_files/',false);
    } catch (err) {
        throw err;
    }
};

const notify = err => {
    const time = moment().tz('Asia/Bangkok').format()
    const subject = (!!err)? `Failed to delete files at ${time}` : `Succeeded deleted files at ${time}`
    const sg = sendgrid(config.key)
    const request = sg.emptyRequest()

    request.method = 'POST'
    request.path = '/v3/mail/send'
    request.body = {
        personalizations: [
            {
                to: [
                    { email: 'korakod.chaisongkram@itorama.com' }
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

const rmDir = (dirPath, removeSelf) => new Promise((resolve, reject) => {
  if (removeSelf === undefined)
    removeSelf = true;
  try { var files = fs.readdirSync(dirPath); }
  catch(e) { notify(err);return; }
  console.log(files.length);
  if (files.length > 0)
      for (var i = 0; i < files.length; i++) {
          var filePath = dirPath + '/' + files[i];
          if (fs.statSync(filePath).isFile())
          fs.unlinkSync(filePath);
          else
          rmDir(filePath);
          console.log('deleting..');
      }
      console.log('Done');
      return resolve();
  if (removeSelf)
    fs.rmdirSync(dirPath);
});

new CronJob({
  cronTime: '00 50 6 * * *',
  onTick: _ => {
    init()
        .then(_ => {
            const time = moment().tz('Asia/Bangkok').format()
            console.log(`Clear files are done at: ${time}`)
        })
        .catch(err => {
            notify(err)
            return err
        })
        .then(value => {
            notify(value)
        });
  },
  start: true,
  timeZone: 'Asia/Bangkok'
});
