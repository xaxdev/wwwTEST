import Boom from 'boom';
import GenTemplateHtml from '../utils/genTemplateYingPdf';
import GenTemplateHtmlStaging from '../utils/genTemplateYingPdf_staging';
import * as file from '../utils/file';
import moment from 'moment-timezone';
import sendgrid from 'sendgrid';
import sendgridConfig from '../sendgrid.json';
import numberFormat from '../utils/convertNumberformat';
import nodeoutlook  from 'nodejs-nodemailer-outlook';

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
                let initialOrder = 0
                listItems.push(['??????????????','?????? ????????????','??????????????????','???????????? ????????????????','?????????????? ??????????????']);
                let params = {}
                params = {...params, listItems, initialOrder, lng}

                const itemTable = items.reduce(reducer, params).listItems
                const totalPrice = items.reduce((prev, curr) => prev + (Number(curr.priceInHomeCurrency) || 0), 0);
                const totalNetVatPrice = items.reduce((prev, curr) => prev + (Number(curr.netVatPrice) || 0), 0);
                itemTable.push(['Total / ???????????? ????????????????', numberFormat(totalPrice), numberFormat(totalNetVatPrice)])

                let setImagePath = ''

                switch (env) {
                    case 'production':
                        setImagePath = `../../../../../../../../../../../mnt/u01/mol/images/products/original/${setImages}`;        
                        break;
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
            
            console.log(`user Email: ${userEmail}`);
            
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

// const notify = (err, userEmail, emailBody) => new Promise((resolve, reject) => {
//     const time = moment().tz('Asia/Bangkok').format()
//     const subject = (!!err)? `Failed print data to pdf  ${time}` : `Succeeded print data to pdf ${time}`
//     const sg = sendgrid(sendgridConfig.key)
//     const request = sg.emptyRequest()

//     request.method = 'POST'
//     request.path = '/v3/mail/send'
//     request.body = {
//         personalizations: [
//             {
//                 to: [
//                     {
//                         email: userEmail
//                     }
//                 ],
//                 subject
//             }
//         ],
//         from: {
//             email: 'Korakod.C@Mouawad.com',
//             name: 'Mouawad Admin'
//         },
//         content: [
//             {
//                 type: 'text/plain',
//                 value: (!!err)? err.message : emailBody
//             }
//         ]
//     };

//     sg
//         .API(request)
//         .then(response => {
//             console.log(response.statusCode)
//             console.log(response.body)
//             console.log(response.headers)
//             return resolve()
//         })
//         .catch(err => {
//             console.log(err);
//         });
// });

const notify = (err, userEmail, emailBody) => new Promise((resolve, reject) => {
    const time = moment().tz('Asia/Bangkok').format()
    const subject = (!!err)? `Failed print data to pdf  ${time}` : `Succeeded print data to pdf ${time}`

    nodeoutlook.sendEmail({
        auth: {
            user: 'noreply@mouawad.com',
            pass: 'Y63jeYVvF!'
        },
        from: 'noreply@mouawad.com',
        to: userEmail,
        subject: subject,
        html: emailBody,
        onError: (e) => {
            console.log(e)
            return reject(e)
        },
        onSuccess: (i) => {
            console.log(i)
            return resolve()
        }
    });
});

function createTable(doc, data, lng, width = 500) {
    try {
        const startY = 580
        const startX = 70
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
                            // doc
                            // .fontSize(12)
                            // .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                            // .text(text.split(' ').reverse().join(' ').split('\n').reverse().join('\n'), currentX + distanceX-5, currentY + 3);
                            doc.image('../../web/code/plugins/http/public/images/order.png', 70, 575, {
                                align: 'center',
                                valign: 'top',
                                width: 35
                            });
                            blockSize = 40
                            break;
                        case 1:
                            //Reference
                            // doc
                            // .fontSize(12)
                            // .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                            // .text(text.split(' ').reverse().join(' ').split('\n').reverse().join('\n'), currentX + distanceX, currentY + 3);
                            doc.image('../../web/code/plugins/http/public/images/skunumber-pdf.png', 120, 580, {
                                align: 'center',
                                valign: 'top',
                                width: 45
                            });
                            blockSize = 60
                            break;
                        case 2:
                            //Description
                            // doc
                            // .fontSize(12)
                            // .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                            // .text(text.split(' ').reverse().join(' ').split('\n').reverse().join('\n'), currentX + distanceX + 80, currentY + 3);
                            doc.image('../../web/code/plugins/http/public/images/description.png', 180, 575, {
                                align: 'center',
                                valign: 'top',
                                width: 200
                            });
                            blockSize = 230
                            break;
                        case 3:
                            //Public Price
                            // doc
                            // .fontSize(12)
                            // .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                            // .text(text.split(' ').reverse().join(' ').split('\n').reverse().join('\n'), currentX + distanceX, currentY + 3);
                            doc.image('../../web/code/plugins/http/public/images/pp.png', 405, 575, {
                                align: 'center',
                                valign: 'top',
                                width: 70
                            });
                            blockSize = 70
                            break;
                        default:
                            //Net Price
                            // doc
                            // .fontSize(12)
                            // .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                            // .text(text.split(' ').reverse().join(' ').split('\n').reverse().join('\n'), currentX + distanceX, currentY + 3);
                            doc.image('../../web/code/plugins/http/public/images/net.png', 475, 580, {
                                align: 'center',
                                valign: 'top',
                                width: 55
                            });
                            blockSize = 70
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
                            
                            blockSize = 330
                            break;
                        case 1:
                            //Public Price
                            doc
                            .fontSize(8)
                            .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                            .text(text, currentX + distanceX + 10, currentY + 5);
                            blockSize = 70
                            break;
                        default:
                            //Net Price
                            doc
                            .fontSize(8)
                            .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                            .text(text, currentX + distanceX, currentY + 5, {align: 'right'});
                            blockSize = 70
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
                            blockSize = 60
                            break;
                        case 2:
                            //Description
                            if (lng == 'eng') {
                                doc
                                .fontSize(8)
                                .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                                .text(text, currentX + distanceX, currentY + 5);
                                blockSize = 230
                                break;   
                            } else {
                                if (text.length < 55) {
                                    doc
                                    .fontSize(8)
                                    .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                                    .text(text.split(' ').reverse().join(' ').split('\n').reverse().join('\n'), currentX - 70, currentY + 5, {align: 'center'});
                                    blockSize = 230
                                    break;
                                } else {
                                    doc
                                    .fontSize(8)
                                    .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                                    .text(text.split(' ').reverse().join(' ').split('\n').reverse().join('\n'), currentX - 140, currentY + 5, {align: 'center'});
                                    blockSize = 230
                                    break;
                                }
                            }
                        case 3:
                            //Public Price
                            doc
                            .fontSize(8)
                            .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                            .text(text, currentX + distanceX + 10, currentY + 5);
                            blockSize = 70
                            break;
                        default:
                            //Net Price
                            doc
                            .fontSize(8)
                            .font('plugins/http/public/fonts/Mirza-Regular.ttf')
                            .text(text, currentX + distanceX, currentY + 5, {align: 'right'});
                            blockSize = 70
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
    } catch (error) {
        console.log(error)
        notify(error, '', '');
    }
}

const reducer = (params, current) => {
    let {listItems, initialOrder, lng} = params
    let itemRow = []
    let order = 0
    let size = (lng != 'eng')? 80: 65
    const rangeMax = current.description.length
    const rounds = Math.ceil((rangeMax + 1) / size);
    let rangeMin = 0

    if (rounds == 1) {
        initialOrder += 1
        itemRow.push(initialOrder)
        itemRow.push(current.reference)
        itemRow.push(current.description)
        itemRow.push(numberFormat(current.priceInHomeCurrency)) // Public Price
        itemRow.push(numberFormat(current.netVatPrice)) // Net Price

        listItems.push(itemRow)
    } else {
        for (let i = 0; i < rounds; i++) {
            const from =  (i * size) + rangeMin;
            const to = (i * size) + size + rangeMin - 1;
            if (i == 0) {
                initialOrder += 1
                itemRow.push(initialOrder)
                itemRow.push(current.reference)
                itemRow.push(current.description.slice(from, to))
                itemRow.push(numberFormat(current.priceInHomeCurrency)) // Public Price
                itemRow.push(numberFormat(current.netVatPrice)) // Net Price

                listItems.push(itemRow)
                itemRow = []
            } else {
                itemRow.push('')
                itemRow.push('')
                itemRow.push(current.description.slice(from, to))
                itemRow.push('') // Public Price
                itemRow.push('') // Net Price

                listItems.push(itemRow)
                itemRow = []
            }
        }
    }

    params = {...params, listItems, initialOrder}
    
    return params
}