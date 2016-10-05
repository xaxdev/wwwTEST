import moment from 'moment';
import xl from 'excel4node'
import path from 'path'

const save = async (titles, data,userName,file,wb,ws,cell,style) => {

   const save = file => new Promise((resolve, reject) => {
       wb.write(file, err => {
           if (err) {
               return reject(err)
           }
           console.log('Write excel done.');
           return resolve()
       })
   })

   try {

     // await save('test.xlsx');

     let i = (file*5000) + 1;
     console.log('row-->',i);
     Promise.all(data.forEach(function(item){
       i++;
       // allData.push({'id': item.id,'reference':item.reference});
       // Set value of cell A1 to 100 as a number type styled with paramaters of style
       if(i>=2){
         // console.log('t-->',t);
         // console.log('item-->',item);
         for (let j = 0; j < cell; j++) {
           // console.log('i-->',i);
           // console.log('j-->',j);
           // console.log('item[j]-->',item[j]);
           let row = i;
           let column = j+1;
           ws.cell(row,column).string((item[j] != undefined) ? item[j].toString() : '').style(style);
          //  if (fields.showImages){
          //    ws.addImage({
          //        path: './plugins/http/assets/images/blank.gif',
          //        type: 'picture',
          //        position: {
          //            type: 'oneCellAnchor',
          //            from: {
          //                col: 1,
          //                colOff: '0.0in',
          //                row: 1,
          //                rowOff: 0
          //            }
          //        }
          //    });
          //  }
         }
       }
       // console.log('item.reference-->',item[0]);
       // console.log('item.description-->',item[1]);
       // ws.cell(i,1).string(item[0]).style(style);
       // ws.cell(i,2).string(item[1]).style(style);

     }));

     let startDate = new Date();
     let exportDate = moment(startDate,'MM-DD-YYYY');
     exportDate = exportDate.format('YYYYMMDD_HHmm');

    //  let fileName = 'Excel_' + userName + '_' + exportDate + '.xlsx';
    //  console.log('fileName-->',fileName);

     // console.log('save-->',save);

     // wb.write(fileName, function (err, stats) {
     //     if (err) {
     //         console.error(err);
     //     }
     //     console.log('Write excel done.'); // Prints out an instance of a node.js fs.Stats object
     //
     //     // console.log(Path.resolve(__dirname, '../../../export-data/' + fileName));
     //     // listFileName.push(ROOT_URL +'/export_files/'+ fileName);
     //     // // console.log('listFileName-->',listFileName[0]);
     //     //
     //     // let _pathDistFile = Path.resolve(__dirname, '../../../export-data/export_files');
     //     // let _pathSourceFile = Path.resolve(__dirname, '../../../export-data/' + fileName);
     //     // let readStream = fs.createReadStream(_pathSourceFile); // current file
     //     // let writeStream = fs.createWriteStream(_pathDistFile + '/' + fileName);
     //     //
     //     // readStream   // reads current file
     //     // .pipe(writeStream)  // writes to out file
     //     // .on('finish', function () {  // all done
     //     //   console.log('copy done');
     //     //   fs.unlink(_pathSourceFile,function(err){
     //     //     if(err) return console.log(err);
     //     //     console.log('file deleted successfully');
     //     //     // elastic.close();
     //     //     // // console.log('Write excel done.');
     //     //     // return reply(GetAllData(response, sortDirections, sortBy, pageSize, page, userCurrency, listFileName));
     //     //   });
     //     // });
     // });

     await save('test.xlsx')
   } catch (e) {
       console.log(e)
   }

};
export { save };
