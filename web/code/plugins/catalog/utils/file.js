import fs from 'fs';

const Path = require('path');
const archiver = require('archiver');
const Promise = require('bluebird');

const read = async file => {
    try {
        return await new Promise((resolve, reject) => {
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    } catch (err) {
        throw err
    }
}

const write = async (file, data) => {
    try {
        return await new Promise((resolve, reject) => {
            fs.writeFile(file, data, err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    } catch (err) {
        throw err
    }
}

const save = (file, wb) => new Promise((resolve, reject) => {
    wb.write(file, err => {
        if (err) {
            return reject(err)
        }

        const _pathSourceFile = Path.resolve(__dirname, '../../../' + file);
        const _pathDistFile = Path.resolve(__dirname, '../../../plugins/http/public/export_files');
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

export { read, write, save };
