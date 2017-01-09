const Boom = require('boom');
const Hoek = require('hoek');
const Joi = require('joi');
const fs = require('fs');
const Path = require('path');
const archiver = require('archiver');

module.exports = {
    auth: {
      strategy: 'authentication'
    },
    handler: (request, reply) => {
        (async _ => {
            const copyFile = (source, target) => new Promise((resolve, reject) => {
                try {
                    const rd = fs.createReadStream(source);
                    rd.on('error', rejectCleanup);
                    const wr = fs.createWriteStream(target);
                    wr.on('error', rejectCleanup);
                    function rejectCleanup(err) {
                        rd.destroy();
                        wr.end();
                        return reject(err);
                    }
                    wr.on('finish', resolve);
                    rd.pipe(wr);
                    return resolve();
                } catch (err) {
                    console.log(err);
                    return reject(err);
                }
            });

            const mkDir = (dir) => new Promise((resolve, reject) => {
                if (!fs.existsSync(dir)){
                    fs.mkdirSync(dir);
                    return resolve();
                }
                else
                {
                    rmDir(dir,false);
                    console.log('Directory already exist.');
                    return resolve();
                }
            });

            const rmDir = (dirPath, removeSelf) => new Promise((resolve, reject) => {
              if (removeSelf === undefined)
                removeSelf = true;
              try { var files = fs.readdirSync(dirPath); }
              catch(e) { notify(err);return; }
              console.log(files.length);
              if (files.length > 0)
                  for (var i = 0; i < files.length; i++) {
                      var filePath = dirPath + '/' + files[i];
                      if (fs.statSync(filePath).isFile())
                      fs.unlinkSync(filePath);
                      else
                      rmDir(filePath);
                      console.log('deleting..');
                  }
                  console.log('Done');
                  return resolve();
              if (removeSelf)
                fs.rmdirSync(dirPath);
            });

            const zipFolder = dirPath => new Promise((resolve, reject) => {
                console.log(dirPath + '.zip');
                const output = fs.createWriteStream(dirPath + '.zip');
                const archive = archiver('zip');

                output.on('close', function () {
                    console.log(archive.pointer() + ' total bytes');
                    console.log('archiver has been finalized and the output file descriptor has closed.');
                });

                archive.on('error', function(err) {
                    console.log(err);
                    return reject(err);
                });

                archive.pipe(output);
                console.log('pipe');
                archive.bulk([
                    { expand: true, cwd: dirPath, src: ['*'] }
                ]);
                console.log('bulk');
                archive.finalize();
                console.log('zip done');
                return resolve();
            });

            try {
                const host = request.info.hostname;
                const id = request.params.productId || '';
                // const email = request.query.email;
                // console.log(request.payload);
                const source = Path.resolve(__dirname, '../../http/public/images/products/original/1117866493_MME-004501.jpg')
                const cerFolder = Path.resolve(__dirname, '../../http/public/download_files/certifacate/tor')
                const destination = Path.resolve(__dirname, '../../http/public/download_files/certifacate/tor/1117866493_MME-004501.jpg')

                // await mkDir(cerFolder);
                //
                // await copyFile(source,destination);
                // await zipFolder(cerFolder);
                // console.log('copy done');

                return reply({ status: true });
            } catch (err) {
                console.log(err)
                return reply(Boom.badImplementation('', err));
            }
        })()

    }
};
