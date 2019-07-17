import Boom from 'boom'
const fs = require('fs');
const Path = require('path');

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {
        try {
            const { images, fileName } = request.payload;
            const _pathDistFile = Path.resolve(__dirname, `../../../plugins/http/public/upload_file/${fileName}`);
            const _pathLinux = Path.resolve(__dirname,`../../../../../../../../../../../mnt/u01/mol/images/products/original/${fileName}`);
            const base64Data = images.replace(/^data:([A-Za-z-+/]+);base64,/, '');
            
            await fs.writeFile(_pathDistFile, base64Data, 'base64', (err) => {
                if (err) {
                    return reply(Boom.badImplementation('', err)); 
                }
            })

            await fs.createReadStream(_pathDistFile).pipe(fs.createWriteStream(_pathLinux));

            return reply({fileName, path: _pathDistFile})
        } catch (error) {
            return reply(Boom.badImplementation('', error));
        }
    }
}