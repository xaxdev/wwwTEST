'use strict';

const Path = require('path');

const controller = require('require-all')(Path.normalize(__dirname + '/controllers'));

module.exports = [
    {
        method: 'GET',
        path: '/css/{path*}',
        config: controller.assets.css
    },
    {
        method: 'GET',
        path: '/fonts/{path*}',
        config: controller.assets.fonts
    },
    {
        method: 'GET',
        path: '/js/{path*}',
        config: controller.assets.js
    },
    {
        method: 'GET',
        path: '/images/{path*}',
        config: controller.assets.images
    },
    {
        method: 'GET',
        path: '/images/products/{path*}',
        config: controller.assets.imagesProduct
    },
    {
        method: 'GET',
        path: '/upload_file/{path*}',
        config: controller.assets.uploadFile
    },
    {
        method: 'GET',
        path: '/export_files/{path*}',
        config: controller.assets.exportFile
    },
    {
        method: 'GET',
        path: '/download_files/{path*}',
        config: controller.assets.downloadFile
    },
    {
        method: 'GET',
        path: '/original/csl/{path*}',
        config: controller.assets.originalCSL
    },
    {
        method: 'GET',
        path: '/original/mam/{path*}',
        config: controller.assets.originalMAM
    },
    {
        method: 'GET',
        path: '/original/mat/{path*}',
        config: controller.assets.originalMAT
    },
    {
        method: 'GET',
        path: '/original/mbs/{path*}',
        config: controller.assets.originalMBS
    },
    {
        method: 'GET',
        path: '/original/mdo/{path*}',
        config: controller.assets.originalMDO
    },
    {
        method: 'GET',
        path: '/original/mdt/{path*}',
        config: controller.assets.originalMDT
    },
    {
        method: 'GET',
        path: '/original/mjw/{path*}',
        config: controller.assets.originalMJW
    },
    {
        method: 'GET',
        path: '/original/mku/{path*}',
        config: controller.assets.originalMKU
    },
    {
        method: 'GET',
        path: '/original/mme/{path*}',
        config: controller.assets.originalMME
    },
    {
        method: 'GET',
        path: '/original/mmf/{path*}',
        config: controller.assets.originalMMF
    },
    {
        method: 'GET',
        path: '/original/mmu/{path*}',
        config: controller.assets.originalMMU
    },
    {
        method: 'GET',
        path: '/original/std/{path*}',
        config: controller.assets.originalSTD
    },
    {
        method: 'GET',
        path: '/original/sts/{path*}',
        config: controller.assets.originalSTS
    },
    {
        method: 'GET',
        path: '/original/stsa/{path*}',
        config: controller.assets.originalSTSA
    },
    {
        method: 'GET',
        path: '/original/old/{path*}',
        config: controller.assets.originalOLD
    },
    {
        method: 'GET',
        path: '/{path*}',
        handler: {
            file: Path.join(__dirname, 'index.htm')
        }
    }
];
