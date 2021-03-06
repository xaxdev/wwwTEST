import { Client as elasticsearch } from 'elasticsearch'
import xl from 'excel4node'
import moment from 'moment-timezone';

const Promise = require('bluebird');

module.exports = async (obj, config, parameter, body, utils, userEmail, channel, msg) => {
    let listFileName = [];
    let emailBody = '';
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

    const client = new elasticsearch({ host: config.elasticsearch.host });

    try {
        if (!!obj.viewAsSet) {
            let sortBy = obj.sortBy;
            let sortDirections = obj.sortDirections;

            const getAllItems = client.search({
                "index": config.elasticsearch.index,
                "type": config.elasticsearch.typeItems,
                "from": 0,
                "size": 100000,
                "filter_path": "**._source",
                "body": body
            });

            const getSetReference = getAllItems.then((response) => {
                const setReferenceResult = response.hits.hits.map((element) => element._source);
                const setReferenceFilter = setReferenceResult.filter((item) => {
                    return item.setReference != undefined && item.setReference != '';
                })
                const setReferenceArray = setReferenceFilter.map((item) => {
                    return item.setReference;
                })
                const setReferenceUniq = setReferenceArray.sort().filter(function(item, pos, ary) {
                    return !pos || item != ary[pos - 1];
                })
                if (obj.sortBy.indexOf('price') != -1) {
                    sortBy = 'totalPrice.USD';
                }else if (obj.sortBy.indexOf('Date') != -1) {
                    sortBy = 'createdDate';
                }else if (obj.sortBy.indexOf('Date') != -1) {
                    sortBy = 'createdDate';
                }else if (obj.sortBy.indexOf('setReference') != -1) {
                    sortBy = 'reference';
                }else{
                    sortBy = sortBy;
                }

                let missing = '';

                switch (sortDirections) {
                    case 'asc':
                        missing = '"missing" : "_first"';
                        missing = `{"${sortBy}" : {${missing}}},`;
                        break;
                    default:
                        break;
                }

                const query = JSON.parse(
                    `{
                        "timeout": "5s",
                        "from": 0,
                        "size": 10000,
                        "sort" : [
                            ${missing}
                            {"${sortBy}" : "${sortDirections}"}
                        ],
                        "query":{
                            "constant_score": {
                                "filter": {
                                    "bool": {
                                        "must": [
                                            {
                                                "match": {
                                                    "reference": "${setReferenceUniq.join(' ')}"
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }`
                );
                return client.search({
                    index: config.elasticsearch.index,
                    type: config.elasticsearch.typeSetItem,
                    body: query
                })
            });

            Promise.all([getAllItems, getSetReference]).spread(async (allItems, setReferences) =>  {
                const allItemsResult = allItems.hits.hits.map((element) => element._source);
                const setReferenceData = setReferences.hits.hits.map((element) => element._source);
                client.close();

                const count = setReferenceData.length;
                const sizeWrite = config.excel.bufferSize;
                const rounds = Math.ceil(count/sizeWrite);
                console.log(`User Name --> ${obj.userName}`);
                console.log(`Number of Item --> ${count}`);
                console.log(`Total rounds --> ${rounds}`);

                for (let i = 0; i < rounds; i++) {
                    let chkRounds = i+1;
                    const from = sizeWrite * i;
                    console.log(`round --> ${chkRounds}`);

                    const titles = await utils.getTitles(setReferences, obj);

                    titles.forEach(function(title){
                        cell++;
                        if(title == 'Ingredients'){
                            isIngredients = true;
                            cellIngredients = cell;
                        }
                        ws.cell(1,cell).string(title).style(style);
                    });

                    const data = await utils.getSetItems(setReferences, obj);
                    console.log(`write rows --> ${data.length}`);
                    totalRecord = totalRecord + data.length;

                    data.map(function (item) {
                        for (let j = 0; j < cell; j++) {
                            let column = j+1;
                            if (column != 1) {
                                ws.cell(row,column).string((item[j] != undefined) ? item[j].toString() : '').style(style);
                            }else{
                                if (obj.fields.showImagesViewAsSet){
                                    if(column == 1){
                                        let pathImage = '';

                                        if (item[0] != '') {
                                            let arrImages = item[0].split("/").slice(-1).pop();
                                            // pathImage = '/home/mol/www/projects/mol/web/code/plugins/http/public/images/products/thumbnail/' + arrImages
                                            // pathImage = 'D:/Projects/GitLab/mol2016/web/code/plugins/http/public/images/products/thumbnail/' + arrImages
                                            pathImage = `${config.images.path}/thumbnail/`+ arrImages;
                                        }else{
                                            pathImage = './images/blank.gif';
                                        }

                                        ws.column(1).setWidth(15);
                                        ws.row(row).setHeight(150);
                                        let isExist = utils.fileExists(pathImage);
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
                                }else{
                                    ws.cell(row,column).string((item[j] != undefined) ? item[j].toString() : '').style(style);
                                }
                            }
                        };
                        row++
                    });
                    const maxRow = (config.excel.maxRow*file);
                    const div = (row > maxRow);
                    console.log(`check ${row} > ${config.excel.maxRow} -->`,div);
                    console.log(`Total rows --> ${totalRecord}`);

                    console.log('file-->',file);
                    await utils.saveFile(fileName, wb);

                    if (div) {
                        wb = new xl.Workbook();
                        ws = wb.addWorksheet('Data');
                        row = 2;
                        file++;
                        fileName = obj.userName + '_' + exportDate + '_' + file.toString() + '.xlsx';
                        listFileName.push(fileName.replace('.xlsx','.zip'));
                    }

                    if (rounds == chkRounds) {
                        let number = 1;
                        emailBody = '';
                        listFileName.forEach(function (name) {
                            emailBody = emailBody + `${number}. ${name} (http:${obj.ROOT_URL}/export_files/${name})\n`;
                            number++;
                        });
                        emailBody = `Please download the files only by today from below link .\n` + emailBody;
                        client.close();
                        await utils.notifyFile('', userEmail, emailBody);
                        channel.ack(msg)
                    }
                }
            })
            .catch(function(err) {
                client.close();
                console.log(err)
            });
        }else{
            const { count }  = await client.count(parameter);
            const sizeWrite = config.excel.maxRow;
            const from = 0;
            const result = await client.search({
                "index": config.elasticsearch.index,
                "type": config.elasticsearch.typeItems,
                "sort": "id",
                "from": from,
                "size": count,
                "filter_path": "**._source",
                "body": body
            });
            const data = await utils.getIngredients(result, obj);
            const rounds = Math.ceil(data.length/sizeWrite);
            console.log(`User Name --> ${obj.userName}`);
            console.log(`Number of Item&Ingredients --> ${data.length}`);
            console.log(`Total rounds --> ${rounds}`);
            // Added Title to ws
            const titles = await utils.getTitles(result, obj);

            titles.forEach(function(title){
                cell++;
                if(title == 'Ingredients'){
                    isIngredients = true;
                    cellIngredients = cell;
                }
                ws.cell(1,cell).string(title).style(style);
            });

           //  data.map(async(item)=> {
           for (let i = 0; i < data.length; i++) {
               let column = 0;
               for (let j = 0; j < cell; j++) {
                   column = j+1;
                   if (column != 1) {
                       ws.cell(row,column).string((data[i][j] != undefined) ? data[i][j].toString() : '').style(style);
                   }else{
                       // console.log('showImages-->',obj.fields.showImages);
                       if (obj.fields.showImages){
                           if(isIngredients){
                               if(data[i][j] != undefined){
                                   let price = obj.price;
                                   let columnMain = 0;
                                   if (obj.userCurrency != 'USD') {
                                       if (price == 'All') {
                                           columnMain = 18;
                                       }
                                       if (price == 'Updated') {
                                           columnMain = 16;
                                       }
                                       if (price == 'Public') {
                                           columnMain = 14;
                                       }
                                   } else {
                                       if (price == 'All') {
                                           columnMain = 15;
                                       }
                                       if (price == 'Updated') {
                                           columnMain = 14;
                                       }
                                       if (price == 'Public') {
                                           columnMain = 13;
                                       }
                                   }
                                   if(data[i][columnMain] == 'Main'){
                                       let pathImage = '';

                                       if (data[i][0] != '') {
                                           let arrImages = data[i][0].split("/").slice(-1).pop();
                                           pathImage = `${config.images.path}/thumbnail/`+ arrImages;
                                       }else{
                                           pathImage = './images/blank.gif';
                                       }

                                       ws.column(1).setWidth(15);
                                       ws.row(row).setHeight(150);
                                       let isExist = utils.fileExists(pathImage);
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
                           }else{
                               if(column == 1){
                                   let pathImage = '';

                                   if (data[i][0] != '') {
                                       let arrImages = data[i][0].split("/").slice(-1).pop();
                                       //   pathImage = '/home/mol/www/projects/mol/web/code/plugins/http/public/images/products/thumbnail/' + arrImages
                                       // pathImage = 'D:/Projects/GitLab/mol2016/web/code/plugins/http/public/images/products/thumbnail/' + arrImages
                                       pathImage = `${config.images.path}/thumbnail/`+ arrImages;
                                   }else{
                                       pathImage = './images/blank.gif';
                                   }

                                   ws.column(1).setWidth(15);
                                   ws.row(row).setHeight(150);
                                   let isExist = utils.fileExists(pathImage);
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
                       }else{
                           ws.cell(row,column).string((data[i][j] != undefined) ? data[i][j].toString() : '').style(style);
                       }
                   }
               };
               row++;
               totalRecord++;
               const maxRow = (config.excel.maxRow);
               const div = (row > maxRow);
               if (div) {
                   console.log('file-->',file);
                   console.log('fileName-->',fileName);
                   console.log('row-->',row);
                   console.log('maxRow-->',maxRow);
                   console.log(`Total rows --> ${row}`);
                   await utils.saveFile(fileName, wb);
                   file++;
                   row = 2;
                   cell = 0;
                   wb = new xl.Workbook();
                   ws = wb.addWorksheet('Data');

                   // Added Title to ws
                   const titles = await utils.getTitles(result, obj);

                   titles.forEach(function(title){
                       cell++;
                       if(title == 'Ingredients'){
                           isIngredients = true;
                           cellIngredients = cell;
                       }
                       ws.cell(1,cell).string(title).style(style);
                   });
                   fileName = obj.userName + '_' + exportDate + '_' + file.toString() + '.xlsx';
                   listFileName.push(fileName.replace('.xlsx','.zip'));
               }else{
                   if (data.length == totalRecord) {
                       console.log('file-->',file);
                       console.log('fileName-->',fileName);
                       console.log('row-->',row);
                       console.log('maxRow-->',maxRow);
                       console.log(`Total rows --> ${row}`);
                       console.log('End');
                       await utils.saveFile(fileName, wb);

                       let number = 1;
                       emailBody = '';
                       listFileName.forEach(function (name) {
                           emailBody = emailBody + `${number}. ${name} (http:${obj.ROOT_URL}/export_files/${name})\n`;
                           number++;
                       });
                       emailBody = `Please download the files only by today from below link .\n` + emailBody;
                       client.close();
                       await utils.notifyFile('', userEmail, emailBody);
                       channel.ack(msg);
                   }
               }
            }
        }
    } catch (e) {
        console.log(e);
    }
}
