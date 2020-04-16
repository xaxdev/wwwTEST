import Boom from 'boom';
import moment from 'moment-timezone';
import sendgrid from 'sendgrid';
import xl from 'excel4node'
import sendgridConfig from '../sendgrid.json';
import * as file from '../utils/file';
import numberFormat from '../utils/convertNumberformat';

const fs = require('fs');
const Path = require('path');
const webshot = require('webshot');

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {
        const user = await request.user.getUserById(request, request.auth.credentials.id);
        const userEmail = user.email;
        let emailBody = '';
        let startDate = new Date();
        let exportDate = moment(startDate,'MM-DD-YYYY');
        exportDate = exportDate.format('YYYYMMDD_HHmm');
        let wb = new xl.Workbook()
        let fileName = user.username + '_' + exportDate + '.xlsx';

        try {
            
            const host = request.info.hostname;
            const ROOT_URL = (host != 'mol.mouawad.com')? `http://${host}:3005`: `http://${host}`;
            const { id } = request.params;
            const db = request.mongo.db
            
            let data = await db.collection('YingCatalogDetail').find({'yingCatalogId' : id}).sort({ id: 1 }).toArray()
            if (data.length == 0) return reply(Boom.badRequest('Invalid Ying CatalogId.'))

            const pathImage = Path.resolve(__dirname, '../../http/public/images/Image_logo_excel.png');
            
            data.map((item,index)=>{
                const { setImages, items, setReference } = item
                const sheetName = `Set ${setReference}`
                // Using on dev mode
                // const setImage = Path.resolve(__dirname, `../../http/public/images/products/thumbnail/${setImages}`);
                // Using on staging and production mode
                const setImage = Path.resolve(__dirname, `../../../../../../../../../../../mnt/u01/mol/images/products/original/${setImages}`);
                let ws = wb.addWorksheet(sheetName)
                let row = 41;

                const style_thinBorder = wb.createStyle({
                    border: {
                        left: {
                            style: 'thin',
                            color: 'black',
                        },
                        right: {
                            style: 'thin',
                            color: 'black',
                        },
                        top: {
                            style: 'thin',
                            color: 'black',
                        },
                        bottom: {
                            style: 'thin',
                            color: 'black',
                        },
                        outline: false,
                    },
                });

                const style_center = wb.createStyle({
                    alignment: {
                        wrapText: true,
                        horizontal: 'center',
                    },
                });

                const style_right = wb.createStyle({
                    alignment: {
                        wrapText: true,
                        horizontal: 'right',
                    },
                });
                
                ws.addImage({
                    path: pathImage,
                    type: 'picture',
                    position: {
                        type: 'oneCellAnchor',
                        from: {
                            col: 1,
                            colOff: '0.0in',
                            row: 1,
                            rowOff: 0
                        }
                    }
                });

                ws.addImage({
                    path: setImage,
                    type: 'picture',
                    position: {
                        type: 'oneCellAnchor',
                        from: {
                            col: 3,
                            colOff: '0.0in',
                            row: 7,
                            rowOff: 0
                        }
                    }
                });

                ws.cell(row,2).string('التسلسل').style(style_thinBorder);
                ws.cell(row,3).string('رقم القطعة').style(style_thinBorder).style(style_center);
                ws.cell(row,4).string('المواصفات').style(style_thinBorder).style(style_center);
                ws.cell(row,5).string('المبلغ الإجمالي').style(style_thinBorder).style(style_center);
                ws.cell(row,6).string('المجموع شامل الضريبة  ( بعد الخصم )').style(style_thinBorder).style(style_center);

                items.map((item,index)=>{
                    const { reference, description, priceInHomeCurrency, netVatPrice } = item;
                    const rowItem = row+1;
                    ws.cell(rowItem,2).string((index+1).toString()).style(style_thinBorder).style(style_center);
                    ws.cell(rowItem,3).string(reference).style(style_thinBorder);
                    ws.cell(rowItem,4).string(description).style(style_thinBorder);
                    ws.cell(rowItem,5).string(numberFormat(priceInHomeCurrency).toString()).style(style_thinBorder).style(style_right);
                    ws.cell(rowItem,6).string(numberFormat(netVatPrice).toString()).style(style_thinBorder).style(style_right);
                    row++;
                })
                const totalPrice = items.reduce((prev, curr) => prev + (Number(curr.priceInHomeCurrency) || 0), 0);
                const totalNetVatPrice = items.reduce((prev, curr) => prev + (Number(curr.netVatPrice) || 0), 0);
                ws.cell(row+1, 2, row+1, 4, true).string('Total / المجموع').style(style_thinBorder).style(style_center);
                ws.cell(row+1, 5).string(numberFormat(totalPrice).toString()).style(style_thinBorder).style(style_right);
                ws.cell(row+1, 6).string(numberFormat(totalNetVatPrice).toString()).style(style_thinBorder).style(style_right);

                ws.column(2).setWidth(7);
                ws.column(3).setWidth(15);
                ws.column(4).setWidth(50);
                ws.column(5).setWidth(15);
                ws.column(6).setWidth(17);

                const pathImageFooter = Path.resolve(__dirname, '../../http/public/images/images_footer.png');

                ws.addImage({
                    path: pathImageFooter,
                    type: 'picture',
                    position: {
                        type: 'oneCellAnchor',
                        from: {
                            col: 1,
                            colOff: '0.0in',
                            row: row+4,
                            rowOff: 0
                        }
                    }
                });
            })
            
            await file.save(fileName, wb);

            emailBody = '';
            emailBody = `Please download the files only by today from below link.\n ${ROOT_URL}/export_files/${fileName.replace('.xlsx','.zip')}`;
            await notify('', userEmail, emailBody);
            
            return reply({ status: true });
        } catch (error) {
            console.log(error)
            notify(error, '', '');
            return reply(Boom.badImplementation('', error));
        }
    }
}

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