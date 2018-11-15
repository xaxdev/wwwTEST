import moment from 'moment-timezone';
import sendgrid from 'sendgrid';
import sendgridConfig from '../sendgrid.json'

const Boom = require('boom');
const Hoek = require('hoek');
const Joi = require('joi');
const fs = require('fs');
const Path = require('path');
const archiver = require('archiver');


module.exports = {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {
        (async _ => {
            const copyFile = (source, target) => new Promise((resolve, reject) => {
                try {
                    const rd = fs.createReadStream(source);
                    rd.on('error', rejectCleanup);
                    const wr = fs.createWriteStream(target);
                    wr.on('error', rejectCleanup);
                    function rejectCleanup(err) {
                        rd.destroy();
                        wr.end();
                        return reject(err);
                    }
                    wr.on('finish', resolve);
                    rd.pipe(wr);
                    return resolve();
                } catch (err) {
                    console.log(err);
                    return reject(err);
                }
            });

            const mkDir = (dir) => new Promise((resolve, reject) => {
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                    console.log('Directory not exist.');
                    return resolve();
                }
                else
                {
                    // rmDir(dir,false);
                    console.log('Directory already exist.');
                    return resolve();
                }
            });

            const rmDir = (dirPath, removeSelf) => new Promise((resolve, reject) => {
                if (removeSelf === undefined)
                    removeSelf = true;
                try { var files = fs.readdirSync(dirPath); }
                catch(e) { notify(err);return; }
                console.log(dirPath);
                if (files.length > 0)
                    for (var i = 0; i < files.length; i++) {
                        var filePath = dirPath + '/' + files[i];
                        if (fs.statSync(filePath).isFile())
                        fs.unlinkSync(filePath);
                        else
                        rmDir(filePath);
                        console.log('deleting..');
                    }
                    return resolve();
                if (removeSelf)
                    fs.rmdirSync(dirPath);
            });

            const zipFolder = dirPath => new Promise((resolve, reject) => {
                console.log(dirPath + '.zip');
                const output = fs.createWriteStream(dirPath + '.zip');
                const archive = archiver('zip');

                output.on('close', function () {
                    console.log(archive.pointer() + ' total bytes');
                    console.log('archiver has been finalized and the output file descriptor has closed.');
                });

                archive.on('error', function(err) {
                    console.log(err);
                    return reject(err);
                });

                archive.pipe(output);
                console.log('pipe');
                archive.bulk([
                    { expand: true, cwd: dirPath, src: ['*'] }
                ]);
                console.log('bulk');
                archive.finalize();
                console.log('zip done');
                return resolve();
            });

            const notify = (err, mailBody, toEmail) => new Promise((resolve, reject) => {
                const time = moment().tz('Asia/Bangkok').format();
                const subject = (!!err)? `Failed download certificate  ${time}` : `Succeeded download certificate ${time}`;
                const sg = sendgrid(sendgridConfig.key);
                const request = sg.emptyRequest();

                request.method = 'POST'
                request.path = '/v3/mail/send'
                request.body = {
                    personalizations: [
                        {
                            to: [
                                {
                                    email: toEmail
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
                            value: (!!err)? err.message : mailBody
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

            const toEmail = request.payload.userEmail;

            try {
                const host = request.info.hostname;
                const id = request.params.productId || '';
                const { userName, allCer, ROOT_URL, company } = request.payload;
                const createTime = moment().format('YYYYMMDD_HHmmss');

                const cerFolder = Path.resolve(__dirname, '../../http/public/export_files/certifacate/');
                const userFolder = Path.resolve(__dirname, `../../http/public/export_files/certifacate/${userName}_${createTime}`);

                let source = '';
                let destination = '';

                await mkDir(cerFolder);
                await mkDir(userFolder);

                if (allCer.length > 1) {
                    allCer.map((img) => {
                        (async _ => {
                            source = '';
                            source = Path.resolve(__dirname, `../../../../../../../../../../media/mol/${company}${img}`);
                            console.log(source);
                            destination = userFolder + '/' + img.replace('/images/products/original/','');
                            await copyFile(source,destination);
                        })()
                    });
                    await zipFolder(userFolder);
                    const emailBody = `Please download the files only by today from below link ${ROOT_URL}/export_files/certifacate/${userName}_${createTime}.zip.`;
                    await notify('', emailBody, toEmail);
                }else{
                    allCer.map((img) => {
                        (async _ => {
                            source = '';
                            source = Path.resolve(__dirname, `../../../../../../../../../../media/mol/${company}${img}`);
                            console.log(source);
                            destination = userFolder + '/' + img.replace('/images/products/original/','');
                            await copyFile(source,destination);
                            const emailBody = `Please download the files only by today from below link ${ROOT_URL}/export_files/certifacate/${userName}_${createTime}${img.replace('/images/products/original/','')}.`;
                            await notify('', emailBody, toEmail);
                        })()
                    });
                }

                return reply({ status: true });
            } catch (err) {
                console.log(err)
                notify(err, '', toEmail);
                return reply(Boom.badImplementation('', err));
            }
        })()

    }
};
