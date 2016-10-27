import amqp from 'amqplib'
import { Client as elasticsearch } from 'elasticsearch'
import xl from 'excel4node'
import moment from 'moment-timezone';
import sendgrid from 'sendgrid'

// import config from './config'
import sendgridConfig from './sendgrid.json'
import * as utils from './utils'

const fs = require('fs');
const Path = require('path');
const AdmZip = require('adm-zip');
const archiver = require('archiver');
const Confidence = require('confidence');

(async _ => {
   // 'amqp://guest:guest@192.168.1.92:5672'
   let emailBody = '';
   let listFileName = [];
   let userEmail = '';

   const save = (file, wb) => new Promise((resolve, reject) => {
    //    console.log('Wirting excel.');
       wb.write(file, err => {
           if (err) {
               return reject(err)
           }

           let _pathSourceFile = Path.resolve(__dirname, './' + file);
           let _pathDistFile = Path.resolve(__dirname, '../web/code/plugins/http/public/export_files');
        //    let readStream = fs.createReadStream(_pathSourceFile); // current file
        //    let writeStream = fs.createWriteStream(_pathDistFile + '/' + file);

            var output = fs.createWriteStream(_pathDistFile + '/' + file.replace('.xlsx','.zip'));
            var archive = archiver('zip');

            output.on('close', function() {
                // console.log('done!');
                fs.unlink(_pathSourceFile,function(err){
                  if(err) return console.log(err);
                  console.log('Write file done.');
                //   console.log('file deleted successfully');
                  return resolve()
                });
            });

            archive.on('error', function(err) {
                throw err;
            });

            archive.pipe(output);
            archive.append(fs.createReadStream(_pathSourceFile), {
                name: file
            });

            archive.finalize();
       })
   });

   const notify = err => new Promise((resolve, reject) => {
       const time = moment().tz('Asia/Bangkok').format()
       const subject = (!!err)? `Failed export data ${time}` : `Succeeded export data ${time}`
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

   const fileExists = filePath => {
       try
        {
            // console.log('file-->',filePath);
            // console.log('file-->',fs.statSync(filePath).isFile());
            return fs.statSync(filePath).isFile();
        }
        catch (err)
        {
            if (err.code == 'ENOENT') { // no such file or directory. File really does not exist
            //   console.log("File does not exist.");
              return false;
            }

            console.log("Exception fs.statSync (" + path + "): " + e);
            throw e; // something else went wrong, we don't have rights, ...
        }
   };

   try {
       const store = new Confidence.Store(require('./config'));
       const config = store.get('/', { env: process.env.NODE_ENV || 'development' });
    //    console.log(config);

       const q = config.rabbit.channel;
       const connection = await amqp.connect(config.rabbit.url);
       const channel = await connection.createChannel();
       await channel.assertQueue(q);
       channel.prefetch(1);
    //    const msg = await consume(channel, q)

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        channel.consume(q, async msg => {
            // channel.ack(msg)
            if (msg !== null) {
                const obj = JSON.parse(msg.content.toString());
                userEmail = obj.userEmail;
                let body = utils.getBody(obj);
                let parameter = {
                   index: config.elasticsearch.index,
                   type: config.elasticsearch.type,
                   body
               };
                const client = new elasticsearch({ host: config.elasticsearch.host });
                try {
                    const { count }  = await client.count(parameter);
                    const size = config.excel.bufferSize;
                    const rounds = Math.ceil(count/size);
                    console.log(`User Name --> ${obj.userName}`);
                    console.log(`Number of Item --> ${count}`);
                    console.log(`Total rounds --> ${rounds}`);
                    let wb = new xl.Workbook()
                    let ws = wb.addWorksheet('Data')
                    let file = 1;
                    let lastFile = 1;
                    let row = 2;
                    let fileName = '';
                    let startDate = new Date();
                    let exportDate = moment(startDate,'MM-DD-YYYY');
                    let totalRecord = 0;
                    exportDate = exportDate.format('YYYYMMDD_HHmm');

                    fileName = obj.userName + '_' + exportDate + '_' + file.toString() + '.xlsx';
                    while (listFileName.length > 0) {
                        listFileName.pop();
                    }
                    listFileName.push(fileName.replace('.xlsx','.zip'));

                   for (let i = 0; i < rounds; i++) {
                        let chkRounds = i+1;
                        const from = size * i;
                        const result = await client.search({
                           "index": config.elasticsearch.index,
                           "type": config.elasticsearch.type,
                           "sort": "id",
                           "from": from,
                           "size": size,
                           "filter_path": "**._source",
                           "body": body
                       });
                        console.log(`round --> ${chkRounds}`);
                        const titles = await utils.getTitles(result, obj);
                        // Create a reusable style
                        let style = wb.createStyle({
                            font: {
                                color: '#000000',
                                size: 12
                            },
                            numberFormat: '$#,##0.00; ($#,##0.00); -'
                        });
                        let cell = 0;
                        let isIngredients = false;
                        let cellIngredients = 0;
                        titles.forEach(function(title){
                          cell++;
                          if(title == 'Ingredients'){
                              isIngredients = true;
                              cellIngredients = cell;
                          }
                          ws.cell(1,cell).string(title).style(style);
                        });

                        const data = await utils.getIngredients(result, obj);
                        console.log(`write rows --> ${data.length}`);
                        totalRecord = totalRecord + data.length;

                        data.map(function (item) {
                            // console.log('ws row-->',row);
                            for (let j = 0; j < cell; j++) {
                              let column = j+1;
                              ws.cell(row,column).string((item[j] != undefined) ? item[j].toString() : '').style(style);

                              if (obj.fields.showImages){
                                  if(isIngredients){
                                      if(cellIngredients = column){
                                          if(item[j] != undefined){
                                              if(item[j] == 'Main'){
                                                  let pathImage = '';

                                                  if (item[0] != '') {
                                                    let arrImages = item[0].split("/").slice(-1).pop();
                                                    //   pathImage = '/var/www/mol/web/code/plugins/http/public/images/products/thumbnail/' + arrImages
                                                    // pathImage = 'D:/Projects/GitLab/mol2016/web/code/plugins/http/public/images/products/thumbnail/' + arrImages
                                                    pathImage = '../web/code/plugins/http/public/images/products/thumbnail/'+ arrImages;
                                                  }else{
                                                    pathImage = './images/blank.gif';
                                                  }

                                                  ws.column(1).setWidth(35);
                                                  ws.row(row).setHeight(250);
                                                  let isExist = fileExists(pathImage);
                                                  if (!isExist) {
                                                      pathImage = './images/blank.gif';
                                                  }
                                                  ws.addImage({
                                                      path: pathImage,
                                                      type: 'picture',
                                                      position: {
                                                          type: 'oneCellAnchor',
                                                          from: {
                                                              col: 1,
                                                              colOff: '0.0in',
                                                              row: row,
                                                              rowOff: 0
                                                          }
                                                      }
                                                  });
                                              }
                                          }
                                      }
                                  }
                              }
                          };
                          row++
                        });
                        const maxRow = (config.excel.maxRow*file);
                        const div = (row > maxRow);
                        console.log(`check ${row} > ${config.excel.maxRow} -->`,div);
                        console.log(`Total rows --> ${totalRecord}`);
                        if (div) {
                            wb = new xl.Workbook();
                            ws = wb.addWorksheet('Data');
                            file++;
                            row = 2;
                            fileName = obj.userName + '_' + exportDate + '_' + file.toString() + '.xlsx';
                            listFileName.push(fileName.replace('.xlsx','.zip'));
                        }
                        console.log('file-->',file);

                        await save(fileName, wb);
                        if (rounds == chkRounds) {
                            let number = 1;
                            emailBody = '';
                            // console.log('listFileName-->',listFileName.length);
                            listFileName.forEach(function (name) {
                                // console.log('name-->',name);
                                emailBody = emailBody + `${number}. ${name} (${obj.ROOT_URL}/export_files/${name})\n`;
                                number++;
                            });
                            emailBody = `Please download the files from below link .\n` + emailBody;
                            // console.log('write file successfully');
                            client.close();
                            await notify('');
                            channel.ack(msg)
                        }
                    }

                } catch (e) {
                    console.log(e);
                }
            }
        }, {noAck: false})
   } catch (err) {
       console.log(err)
       notify(err);
   }
})()
