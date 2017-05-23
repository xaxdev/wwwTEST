import 'babel-polyfill'; // required for async
import { CronJob } from 'cron';
import moment from 'moment-timezone';
import sendgrid from 'sendgrid';
import config from './sendgrid.json';
import configMySQL from './config';
import AWS from 'aws-sdk';

const exec = require('child_process').exec;
const fs = require('fs');
const rebuild_file = './db';
const fileSchema = './db/schema/table/mol-schema.sql';
const fileData = './db/data/moldb-data.sql';
const enviroment = process.env.NODE_ENV || 'development';
const mySqlConfig = configMySQL.mysql[enviroment];

let child = require('child_process').child;
let msgFailed = '';
let msgSucceeded = '';

AWS.config.loadFromPath('./aws.json');

const initBackupSchema = async _ => {
    try {
        console.log(`Start backup my-sql mol schema at: ${moment().tz('Asia/Bangkok').format('HH:mm:ss')}`);
        await backupSchema();

    } catch (err) {
        console.log(err);
        throw err;
    }
};

const initBackupData = async _ => {
    try {
        console.log(`Start backup my-sql mol datas at: ${moment().tz('Asia/Bangkok').format('HH:mm:ss')}`);
        backupData();

    } catch (err) {
        console.log(err);
        throw err;
    }
};

const runSqlScript = (file, command, callback) =>{
        try {
            const rebuild_db = command + fileSchema;
            console.log(rebuild_db);

            child = exec(rebuild_db, function(error, stdout, stderr) {
                if (error !== null) {
                    console.log('Rebuild Error: ' + error);
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    process.exit(1);
                    return;
                }
                console.log('Successfully Rebuild Database using: ');
                console.log('   ' + file);
                // callback();
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
};

const backupSchema = _=> {
    let command = '';
    if (process.env.NODE_ENV != 'production') {
        command = 'mysqldump -u ' + mySqlConfig.user + ' -h ' + mySqlConfig.host + ' ' + mySqlConfig.database + ' --no-data > ';
    }else{
        command = 'mysqldump -u ' + mySqlConfig.user + ' -h ' + mySqlConfig.host + ' -p' + mySqlConfig.password  + ' ' + mySqlConfig.database + ' --no-data > ';
    }

    runSqlScript(fileSchema, command, function() {
                process.exit(0);
            });
};

const backupData = _=> {
    let command = '';
    if (process.env.NODE_ENV != 'production') {
        command = 'mysqldump -u ' + mySqlConfig.user + ' -h ' + mySqlConfig.host + ' ' + mySqlConfig.database + ' > ';
    }else{
        command = 'mysqldump -u ' + mySqlConfig.user + ' -h ' + mySqlConfig.host + ' -p' + mySqlConfig.password  + ' ' + mySqlConfig.database + ' > ';
    }
    runSqlScript(fileData, command, function() {
                process.exit(0);
            });
};

const upload = async params => new Promise((resolve, reject) => {
    const { S3 } = AWS
    const s3 = new S3({ apiVersion: '2006-03-01' })
    console.log('uploading...')
    s3.upload(params, (err, data) => {
        if (err) {
            return reject(err)
        }

        return resolve(data)
    })
});

const sendToAws = _=>{
    (async _ => {

        try {
             const file = fs.readFileSync('./data/moldb-data.sql')
             const response = await upload({
                 Bucket: 'mouawad/mol/backup/mysql/data/20170523',
                 Key: 'moldb-data.sql',
                 Body: file
             })
             console.log(JSON.stringify(response))
        } catch (err) {
            console.log(err)
        }
    })()
};

const notify = err => {

    const subject = (!!err)? msgFailed : msgSucceeded
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

// const jobBackupSchema = new CronJob({
//   cronTime: '00 00 2 * * 2',
//   // cronTime: '00 */3 * * * *',
//   onTick: _ => {
//     initBackupSchema()
//         .then(_ => {
//             const time = moment().tz('Asia/Bangkok').format()
//             console.log(`Backup my-sql mol schema are done at: ${time}`)
//         })
//         .catch(err => {
//             const time = moment().tz('Asia/Bangkok').format();
//             msgFailed = `Failed to backup my-sql mol schema at ${time}`;
//             notify(err)
//             return err
//         })
//         .then(value => {
//             const time = moment().tz('Asia/Bangkok').format();
//             msgSucceeded = `Succeeded backup my-sql mol schema at ${time}`;
//             notify(value)
//         });
//   },
//   start: true,
//   timeZone: 'Asia/Bangkok'
// });

const jobBackupData = new CronJob({
  cronTime: '00 00 2 * * 3',
  // cronTime: '00 */5 * * * *',
  onTick: _ => {
    initBackupData()
        .then(_ => {
            const time = moment().tz('Asia/Bangkok').format()
            console.log(`Backup my-sql mol datas are done at: ${time}`)
        })
        .catch(err => {
            const time = moment().tz('Asia/Bangkok').format();
            msgFailed = `Failed to backup my-sql mol datas at ${time}`;
            notify(err)
            return err
        })
        .then(value => {
            (async _ => {
                const time = moment().tz('Asia/Bangkok').format();
                msgSucceeded = `Succeeded backup my-sql mol datas at ${time}`;
                await sendToAws();
                await notify(value)
            })()
        });
  },
  start: true,
  timeZone: 'Asia/Bangkok'
});

// console.log('jobBackupSchema status', jobBackupSchema.running);
console.log('jobBackupData status', jobBackupData.running);
