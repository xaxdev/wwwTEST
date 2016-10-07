import amqp from 'amqplib'
import { Client as elasticsearch } from 'elasticsearch'
import xl from 'excel4node'
import moment from 'moment';
import config from './config'
import * as utils from './utils'

(async _ => {
   // 'amqp://guest:guest@192.168.1.92:5672'
   const q = 'export'
   let wb = new xl.Workbook()
   let ws = wb.addWorksheet('Data')

   let startDate = new Date();
   let exportDate = moment(startDate,'MM-DD-YYYY');
   exportDate = exportDate.format('YYYYMMDD_HHmm');

   const consume = (channel, q) => new Promise((resolve, reject) => {
       console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
       channel.consume(q, function(msg) {
           channel.ack(msg)
           return resolve(msg)
       })
   })

   const save = (file) => new Promise((resolve, reject) => {
       console.log('Wirting excel.');
       wb.write(file, err => {
           if (err) {
               return reject(err)
           }
           console.log('Write excel done.');
           return resolve()
       })
   });

   try {
       const connection = await amqp.connect(config.rabbit.url)
       const channel = await connection.createChannel()
       await channel.assertQueue(q)
       const msg = await consume(channel, q)
       if (msg !== null) {
           const obj = JSON.parse(msg.content.toString());
           let body = utils.getBody(obj);
           let parameter = {
               index: config.elasticsearch.index,
               type: config.elasticsearch.type,
               body
           }
           const client = new elasticsearch({ host: config.elasticsearch.host })
           const { count } = await client.count(parameter)
           const size = 1000
           const rounds = Math.ceil(count/size)
           console.log(`Total rounds --> ${rounds}`);
           let file = 1
           let row = 2

           for (let i = 0; i < rounds; i++) {
                let chkRounds = i+1
                const from = size * i
                const result = await client.search({
                   "index": config.elasticsearch.index,
                   "type": config.elasticsearch.type,
                   "sort": "id",
                   "from": from,
                   "size": size,
                   "filter_path": "**._source",
                   "body": body
                })
                console.log(`round --> ${chkRounds}`);
                const titles = await utils.getTitles(result, obj)
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

                const data = await utils.getIngredients(result, obj)
                console.log(data.length);

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
                                          ws.column(1).setWidth(35)
                                          ws.row(row).setHeight(200);
                                          ws.addImage({
                                              path: './images/S2075_MME-067531.jpg',
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
                    }
                    row++
                  })
                const maxRow = (25000*file)
                const div = (row > maxRow)
                console.log(`check ${row} > ${25000} -->`,div);
                if (div) {
                    wb = new xl.Workbook()
                    ws = wb.addWorksheet('Data')
                    file++
                    row = 2
                }
                console.log('file-->',file);

                let fileName = obj.userName + '_' + exportDate + '_' + file.toString() + '.xlsx'
                await save(fileName)
                if (rounds == chkRounds) {
                    console.log('write file successfully');
                    client.close();
                }
            }
        }
   } catch (e) {
       console.log(e)
   }
})()
