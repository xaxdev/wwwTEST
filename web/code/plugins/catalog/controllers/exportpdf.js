import Joi from 'joi';
import Boom from 'boom';
import Elasticsearch from 'elasticsearch';
import moment from 'moment-timezone';
import sendgrid from 'sendgrid'
import constants from '../constants';
import GenTemplateHtml from '../utils/genTemplatePdfMyCatalog';
import * as file from '../utils/file';
import sendgridConfig from '../sendgrid.json'

const fs = require('fs');
const Path = require('path');
const pdf = require('html-pdf');

export default {
    auth: {
        strategy: 'authentication'
    },
    validate: {
        query: {
            sort: Joi.number().integer().positive(),
            order: Joi.number().valid(1, -1)
        }
    },
    handler: (request, reply) => {

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

            const client = new Elasticsearch.Client({
                                host: request.elasticsearch.host,
                                keepAlive: false
                            });

            try {
                console.log(request.info.hostname);
                const host = request.info.hostname;
                const ROOT_URL = (host != 'mol.mouawad.com')? `http://${host}:3005`: `http://${host}`;
                const id = request.params.id || '';
                const catalogId = request.mongo.ObjectID(id);
                const page = 1;
                const sort = constants.sort[request.query.sort] || 'lastModified';
                const order = request.query.order || -1;
                const sorting = { [sort]: order };
                const cursor = await request.mongo.db.collection('CatalogName').aggregate([
                            {
                                $match: { _id: catalogId }
                            },
                            {
                                $lookup: {
                                    from: 'CatalogItem',
                                    localField: '_id',
                                    foreignField: 'catalogId',
                                    as: 'items'
                                }
                            },
                            {
                                $project: {
                                    _id: 1,
                                    catalog: 1,
                                    items: 1
                                }
                            }
                        ]);
                const [catalog] = await cursor.toArray();

                if (!!catalog) {
                    if (catalog.items.length === 0) {
                        return reply({ ...catalog, page: 1, total_items: 0, total_pages: 0, });
                    }

                    const es = await client.search(request.helper.item.parameters(catalog.items));
                    const user = await request.user.getUserById(request, request.auth.credentials.id);
                    console.log(user);
                    let inventory = await request.helper.item.inventory(catalog.items, es);
                    const all = await request.helper.item.authorization(user, inventory);

                    const price = all.reduce((previous, current) => previous + current.price, 0);
                    const updatedCost = all.reduce((previous, current) => previous + current.updatedCost, 0);

                    const data = await request.mongo.db.collection('CatalogItem')
                                            .find({ catalogId }, { '_id': 0, 'catalogId': 0, 'lastModified': 0 })
                                            .sort(sorting).toArray();
                    inventory = await request.helper.item.inventory(data, es);
                    const items = await request.helper.item.authorization(user, inventory);

                    const total_items = all.length;
                    const total_pages = page;

                    let htmlTemplate = '';

                    htmlTemplate = GenTemplateHtml(items, user);

                    const exportDate = moment().tz('Asia/Bangkok').format('YYYYMMDD_HHmmss');
                    const userName =  `${user.username}_${exportDate}`;
                    userEmail = user.email;
                    const destination = Path.resolve(__dirname, '../../../../../pdf/import_html')
                    const file_path = `${destination}/${userName}.html`;

                    await file.write(file_path, htmlTemplate);

                    // console.log(htmlTemplate);
                    console.log('writing done!');
                    const html = fs.readFileSync(file_path, 'utf8');
                    const options = { format: 'A4', timeout: 30000 };
                    const _pathDistFile = Path.resolve(__dirname, `../../http/public/export_files/${userName}.pdf`);

                    console.log(`user Email: ${userEmail}`);
                    await save(html, options, _pathDistFile);
                    console.log('writing pdf');
                    emailBody = '';
                    emailBody = `Please download the files only by today from below link ${ROOT_URL}/export_files/${userName}.pdf`;
                    await notify('');

                    return reply({ status: true });
                }

                return reply(Boom.badRequest('Invalid catalog id'));
            } catch (err) {
                console.log(err)
                notify(err);
                return reply(Boom.badImplementation('', err));
            } finally {
                client && client.close();
            }
        })()
    }
}
