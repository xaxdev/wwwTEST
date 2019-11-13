import Boom from 'boom';
import GenTemplateHtml from '../utils/genTemplateYingPdf';
import GenTemplateHtmlStaging from '../utils/genTemplateYingPdf_staging';
import * as file from '../utils/file';
import moment from 'moment-timezone';
import sendgrid from 'sendgrid';
import sendgridConfig from '../sendgrid.json';
import numberFormat from '../utils/convertNumberformat';

const fs = require('fs');
const Path = require('path');
const pdf = require('html-pdf');
const PDFDocument = require('pdfkit');

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {
        const user = await request.user.getUserById(request, request.auth.credentials.id);
        const userEmail = user.email;
        let emailBody = '';
        try {
            const env = process.env.NODE_ENV || 'development'
            const host = request.info.hostname;
            const ROOT_URL = (host != 'mol.mouawad.com')? `http://${host}:3005`: `http://${host}`;
            const { id, lng } = request.params;
            const db = request.mongo.db
            
            let data = await db.collection('YingCatalogDetail').find({'yingCatalogId' : id}).sort({ id: 1 }).toArray()

            // Create a document
            const doc = new PDFDocument();

            // Pipe its output somewhere, like to a file or HTTP response
            // See below for browser usage
            
            const exportDate = moment().tz('Asia/Bangkok').format('YYYYMMDD_HHmmss');
            const userName =  `ying_${user.username}_${exportDate}`;
            const _pathDistFile = Path.resolve(__dirname, `../../http/public/export_files/${userName}.pdf`);

            doc.pipe(fs.createWriteStream(_pathDistFile));

            // Add an image, constrain it to a given size, and center it vertically and horizontally
            doc.image('../../web/code/plugins/http/public/images/Image_logo.jpg', 90, 35, {
                align: 'center',
                valign: 'top',
                width: 420
            });
            doc.image('../../web/code/plugins/http/public/images/images_footer.png', 70, 700, {
                align: 'center',
                valign: 'bottom',
                width: 500
            });
            
            data.map((item,index)=>{
                const { items, setImages } = item
                let listItems = []
                listItems.push(['لسلستلا','ةعطقلا مقر','تافصاوملا','يلامجﻹا غلبملا']);

                const itemTable = items.reduce(reducer, listItems)
                const totalPrice = items.reduce((prev, curr) => prev + (Number(curr.priceInHomeCurrency) || 0), 0);
                itemTable.push(['Total / عومجملا', numberFormat(totalPrice)])

                let setImagePath = ''

                switch (env) {
                    case 'staging':
                        setImagePath = `../../../../../../../../../../../mnt/u01/mol/images/products/original/${setImages}`;        
                        break;
                    case 'development':
                        setImagePath = `../../web/code/plugins/http/public/images/products/original/${setImages}`;        
                        break;
                    default:
                        break;
                }

                // Add data first page
                if (index == 0) {
                    doc.image(setImagePath, 140, 100, {
                        align: 'center',
                        width: 340
                    });

                    createTable(doc, itemTable, lng)   
                } else {
                    // Add another page
                    doc.addPage()

                    doc.image('../../web/code/plugins/http/public/images/Image_logo.jpg', 90, 35, {
                        align: 'center',
                        valign: 'top',
                        width: 420
                    });
                    doc.image(setImagePath, 140, 100, {
                        align: 'center',
                        width: 340
                    });
                    createTable(doc, itemTable, lng)
                    doc.image('../../web/code/plugins/http/public/images/images_footer.png', 70, 700, {
                        align: 'center',
                        valign: 'bottom',
                        width: 500
                    });
                }
            })

            // Draw a triangle
            doc.save()

            // Finalize PDF file
            doc.end();
            //***********************************************************************************/
            
            // if (data.length == 0) return reply(Boom.badRequest('Invalid Ying CatalogId.'))
            // let htmlTemplate = '';

            // switch (env) {
            //     case 'staging':
            //         htmlTemplate = GenTemplateHtmlStaging(data);        
            //         break;
            //     case 'development':
            //         htmlTemplate = GenTemplateHtml(data);        
            //         break;
            //     default:
            //         break;
            // }

            // const exportDate = moment().tz('Asia/Bangkok').format('YYYYMMDD_HHmmss');
            // const userName =  `ying_${user.username}_${exportDate}`;
            // const destination = Path.resolve(__dirname, '../../../../../pdf/import_html')
            // const file_path = `${destination}/${userName}.html`;

            // await file.write(file_path, htmlTemplate);

            // console.log('writing done!');

            // const html = fs.readFileSync(file_path, 'utf8');
            // const options = { format: 'A4', timeout: 30000 };
            // const _pathDistFile = Path.resolve(__dirname, `../../http/public/export_files/${userName}.pdf`);

            console.log(`user Email: ${userEmail}`);
            // await save(html, options, _pathDistFile);
            // console.log('writing pdf');
            console.log('Create PDF done!');
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

function createTable(doc, data, lng, width = 500) {
    const startY = 580
    const startX = 90
    const distanceY = 15
    const distanceX = 10
    doc.fontSize(7);
    
    let currentY = startY;
    data.forEach((value,index) => {
        let currentX = startX
        let size = value.length
        let row = index+1;
    
        let blockSize = width / size;

        if (row == 1) {
            value.forEach((text,index) => {
                //Create rectangles title
                switch (index) {
                    case 0:
                        //Id
                        doc
                        .fontSize(12)
                        .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                        .text(text.split(' ').reverse().join(' ').split('\n').reverse().join('\n'), currentX + distanceX-5, currentY + 3);
                        
                        blockSize = 40
                        break;
                    case 1:
                        //Reference
                        doc
                        .fontSize(12)
                        .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                        .text(text.split(' ').reverse().join(' ').split('\n').reverse().join('\n'), currentX + distanceX, currentY + 3);
                        blockSize = 70
                        break;
                    case 2:
                        //Description
                        doc
                        .fontSize(12)
                        .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                        .text(text.split(' ').reverse().join(' ').split('\n').reverse().join('\n'), currentX + distanceX + 80, currentY + 3);
                        blockSize = 265
                        break;
                    default:
                        //Price
                        doc
                        .fontSize(12)
                        .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                        .text(text.split(' ').reverse().join(' ').split('\n').reverse().join('\n'), currentX + distanceX, currentY + 3);
                        blockSize = 80
                        break;
                }
                
                doc
                .lineJoin('miter')
                .rect(currentX, currentY, blockSize, distanceY)
                .stroke();
                
                currentX += blockSize;
            });
        } else if (row == data.length) {
            value.forEach((text,index) => {
                //Total
                switch (index) {
                    case 0:
                        //Total
                        doc
                        .fontSize(8)
                        .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                        .text(text, currentX + distanceX + 160, currentY + 5);
                        
                        blockSize = 375
                        break;
                    default:
                        //Price
                        doc
                        .fontSize(8)
                        .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                        .text(text, currentX + distanceX, currentY + 5, {align: 'right'});
                        blockSize = 80
                        break;
                }

                doc
                .lineJoin('miter')
                .rect(currentX, currentY, blockSize, distanceY)
                .stroke();

                currentX += blockSize;
            });
        } else {
            value.forEach((text,index) => {
                //Items details
                switch (index) {
                    case 0:
                        //Id
                        doc
                        .fontSize(8)
                        .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                        .text(text, currentX + distanceX + 7, currentY + 5);
                        
                        blockSize = 40
                        break;
                    case 1:
                        //Reference
                        doc
                        .fontSize(8)
                        .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                        .text(text.split(' ').reverse().join(' ').split('\n').reverse().join('\n'), currentX + distanceX, currentY + 5);
                        blockSize = 70
                        break;
                    case 2:
                        //Description
                        console.log({lng});
                        console.log({text});
                        if (lng == 'eng') {
                            doc
                            .fontSize(8)
                            .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                            .text(text, currentX + distanceX, currentY + 5);
                            blockSize = 265
                            break;   
                        } else {
                            doc
                            .fontSize(8)
                            .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                            .text(text.split(' ').reverse().join(' ').split('\n').reverse().join('\n'), currentX + 50, currentY + 5, {align: 'center'});
                            blockSize = 265
                            break;
                        }
                    default:
                        //Price
                        doc
                        .fontSize(8)
                        .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                        .text(text, currentX + distanceX, currentY + 5, {align: 'right'});
                        blockSize = 80
                        break;
                }
                doc
                .lineJoin('miter')
                .rect(currentX, currentY, blockSize, distanceY)
                .stroke();

                currentX += blockSize;
            });
        }
        currentY += distanceY;
    });
}

const reducer = (listItems, current) => {
    let itemRow = []
    itemRow.push(listItems.length)
    itemRow.push(current.reference)
    itemRow.push(current.description)
    itemRow.push(numberFormat(current.priceInHomeCurrency))
    listItems.push(itemRow)
    
    return listItems
}