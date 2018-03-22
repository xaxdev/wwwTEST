import amqp from 'amqplib'
import moment from 'moment-timezone';
import sendgrid from 'sendgrid'
import sendgridConfig from './sendgrid.json'

const officegen = require('officegen');
const docx = officegen ('docx');
const htmlDocx = require('html-docx-js');
const fs = require('fs');
const path = require('path');
const Confidence = require('confidence');

(async _ => {
    let userEmail = '';
    let emailBody = '';

    try {
        const save = (content, options, _pathDistFile) => new Promise((resolve, reject) => {
            try {
                fs.readFile(content, 'utf-8', function(err, html) {
                    if (err) throw err;

                    var docx = htmlDocx.asBlob(html);
                    fs.writeFile(_pathDistFile, docx, function(err) {
                        if (err) throw err;
                        else{
                            console.log("Docx has been created");
                            return resolve();
                        }
                    });
                });
            } catch (err) {
                console.log(err)
                notify(err);
            }
        });

        const notify = err => new Promise((resolve, reject) => {
            const time = moment().tz('Asia/Bangkok').format()
            const subject = (!!err)? `Failed print data to word  ${time}` : `Succeeded print data to word ${time}`
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
            if (msg !== null) {
                const obj = JSON.parse(msg.content.toString());
                const userName = obj.userName;
                userEmail = obj.userEmail;

                const content = `./import_html/${userName}.html`;
                const options = { format: 'A4', timeout: 30000 };

                const _pathDistFile = path.resolve(__dirname, `../web/code/plugins/http/public/export_files/${userName}.docx`);

                console.log(`user Email: ${userEmail}`);
                await save(content, options, _pathDistFile);
                console.log('writing word');
                emailBody = '';
                emailBody = `Please download the files only by today from below link ${obj.ROOT_URL}/export_files/${userName}.docx`;
                await notify('');
                channel.ack(msg)
            }

        }, {noAck: false})

    } catch (err) {
        console.log(err)
    }
})()
