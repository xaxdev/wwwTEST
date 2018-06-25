import amqp from 'amqplib'
import moment from 'moment-timezone';
import sendgrid from 'sendgrid'

import sendgridConfig from './sendgrid.json'

const fs = require('fs');
const Path = require('path');
const pdf = require('html-pdf');
const Confidence = require('confidence');

(async _ => {

    let userEmail = '';
    let emailBody = '';

    const save = (html, options, _pathDistFile) => new Promise((resolve, reject) => {
        // console.log('options-->',options);
        try {
            pdf.create(html, options).toFile(_pathDistFile, function(err, res) {
                if (err) {
                    console.log(err);
                    return reject();
                }
                console.log(res); // { filename: '/app/businesscard.pdf' }
                return resolve()
            });
        } catch (err) {
            console.log(err)
            notify(err);
        }
    });

    const notify = err => new Promise((resolve, reject) => {
        const time = moment().tz('Asia/Bangkok').format()
        const subject = (!!err)? `Failed print data to pdf  ${time}` : `Succeeded print data to pdf ${time}`
        const sg = sendgrid(sendgridConfig.key)
        const request = sg.emptyRequest()

        request.method = 'POST'
        request.path = '/v3/mail/send'
        request.body = {
            personalizations: [
                {
                    to: [
                        {
                            email: userEmail
                        }
                    ],
                    subject
                }
            ],
            from: {
                email: 'dev@itorama.com',
                name: 'Mouawad Admin'
            },
            content: [
                {
                    type: 'text/plain',
                    value: (!!err)? err.message : emailBody
                }
            ]
        };

        sg
            .API(request)
            .then(response => {
                console.log(response.statusCode)
                console.log(response.body)
                console.log(response.headers)
                return resolve()
            })
            .catch(err => {
                console.log(err);
            });
    });
    try {
        const store = new Confidence.Store(require('./config'));
        const config = store.get('/', { env: process.env.NODE_ENV || 'development' });
 
        const q = config.rabbit.channel;
        const connection = await amqp.connect(config.rabbit.url);
        const channel = await connection.createChannel();
        let TotalQueue = await channel.assertQueue(q);
        console.log('Total Queue-->',TotalQueue.messageCount);
 
        channel.prefetch(1);
 
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        channel.consume(q, async msg => {
            let queue = await channel.assertQueue(q);
 
            console.log('queue-->',queue.messageCount);
            // channel.ack(msg)
            if (msg !== null) {
                
                const obj = JSON.parse(msg.content.toString());
                const userName = obj.userName;
                userEmail = obj.userEmail;
 
                const html = fs.readFileSync(`./import_html/${userName}.html`, 'utf8');
                const options = { format: 'A4', timeout: 30000 };
 
                let _pathDistFile = Path.resolve(__dirname, `../web/code/plugins/http/public/export_files/${userName}.pdf`);
 
                console.log(`user Email: ${userEmail}`);
                await save(html, options, _pathDistFile);
                console.log('writing pdf');
                emailBody = '';
                emailBody = `Please download the files only by today from below link ${obj.ROOT_URL}/export_files/${userName}.pdf`;
                await notify('');
                channel.ack(msg)
            }
        }, {noAck: false})
    } catch (err) {
        console.log(err)
        notify(err);
    }
})()
