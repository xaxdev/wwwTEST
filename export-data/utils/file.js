import moment from 'moment-timezone';
import sendgrid from 'sendgrid'
import sendgridConfig from '../sendgrid.json'

const fs = require('fs');
const Path = require('path');
const archiver = require('archiver');
const Promise = require('bluebird');

const save = (file, wb) => new Promise((resolve, reject) => {
    wb.write(file, err => {
        if (err) {
            return reject(err)
        }

        const _pathSourceFile = Path.resolve(__dirname, '../' + file);
        const _pathDistFile = Path.resolve(__dirname, '../../web/code/plugins/http/public/export_files');
        const output = fs.createWriteStream(_pathDistFile + '/' + file.replace('.xlsx','.zip'));
        const archive = archiver('zip');
        
        output.on('close', function() {
            fs.unlink(_pathSourceFile,function(err){
                if(err) return console.log(err);
                console.log('Write file done.');
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

const notify = (err, userEmail, emailBody) => new Promise((resolve, reject) => {
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
            email: 'Korakod.C@Mouawad.com',
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
         return fs.statSync(filePath).isFile();
     }
     catch (err)
     {
         if (err.code == 'ENOENT') { // no such file or directory. File really does not exist
           return false;
         }
         console.log("Exception fs.statSync (" + path + "): " + e);
         throw e; // something else went wrong, we don't have rights, ...
     }
};

export { save, notify, fileExists };