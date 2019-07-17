import Boom from 'boom';
import GenTemplateHtml from '../utils/genTemplateYingPdf';
import * as file from '../utils/file';
import moment from 'moment-timezone';
import sendgrid from 'sendgrid';
import sendgridConfig from '../sendgrid.json';

const fs = require('fs');
const Path = require('path');
const pdf = require('html-pdf');

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {
        const user = await request.user.getUserById(request, request.auth.credentials.id);
        const userEmail = user.email;
        let emailBody = '';
        try {
            const host = request.info.hostname;
            const ROOT_URL = (host != 'mol.mouawad.com')? `http://${host}:3005`: `http://${host}`;
            const { id } = request.params;
            const db = request.mongo.db
            
            let data = await db.collection('YingCatalogDetail').find({'yingCatalogId' : id}).sort({ id: 1 }).toArray()
            
            if (data.length == 0) return reply(Boom.badRequest('Invalid Ying CatalogId.'))
            let htmlTemplate = '';
            htmlTemplate = GenTemplateHtml(data);

            const exportDate = moment().tz('Asia/Bangkok').format('YYYYMMDD_HHmmss');
            const userName =  `ying_${user.username}_${exportDate}`;
            const destination = Path.resolve(__dirname, '../../../../../pdf/import_html')
            const file_path = `${destination}/${userName}.html`;

            await file.write(file_path, htmlTemplate);

            console.log('writing done!');

            const html = fs.readFileSync(file_path, 'utf8');
            const options = { format: 'A4', timeout: 30000 };
            const _pathDistFile = Path.resolve(__dirname, `../../http/public/export_files/${userName}.pdf`);

            console.log(`user Email: ${userEmail}`);
            await save(html, options, _pathDistFile);
            console.log('writing pdf');
            emailBody = '';
            emailBody = `Please download the files only by today from below link ${ROOT_URL}/export_files/${userName}.pdf`;
            await notify('', userEmail, emailBody);
            
            return reply({ status: true });
        } catch (error) {
            console.log(error)
            notify(error, '', '');
            return reply(Boom.badImplementation('', error));
        }
    }
}

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
        notify(err, '', '');
    }
});

const notify = (err, userEmail, emailBody) => new Promise((resolve, reject) => {
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