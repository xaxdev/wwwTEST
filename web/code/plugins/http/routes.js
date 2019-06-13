'use strict';

const Path = require('path');

const controller = require('require-all')(Path.normalize(__dirname + '/controllers'));
const env = process.env.NODE_ENV

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
        config: env == 'production'? controller.assets.imagesProduct: controller.assetsStaging.imagesProduct
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
        config: env == 'production'? controller.assets.originalCSL: controller.assetsStaging.originalCSL
    },
    {
        method: 'GET',
        path: '/original/mam/{path*}',
        config: env == 'production'? controller.assets.originalMAM: controller.assetsStaging.originalMAM
    },
    {
        method: 'GET',
        path: '/original/mat/{path*}',
        config: env == 'production'? controller.assets.originalMAT: controller.assetsStaging.originalMAT
    },
    {
        method: 'GET',
        path: '/original/mbs/{path*}',
        config: env == 'production'? controller.assets.originalMBS: controller.assetsStaging.originalMBS
    },
    {
        method: 'GET',
        path: '/original/mdo/{path*}',
        config: env == 'production'? controller.assets.originalMDO: controller.assetsStaging.originalMDO
    },
    {
        method: 'GET',
        path: '/original/mdt/{path*}',
        config: env == 'production'? controller.assets.originalMDT: controller.assetsStaging.originalMDT
    },
    {
        method: 'GET',
        path: '/original/mjw/{path*}',
        config: env == 'production'? controller.assets.originalMJW: controller.assetsStaging.originalMJW
    },
    {
        method: 'GET',
        path: '/original/mku/{path*}',
        config: env == 'production'? controller.assets.originalMKU: controller.assetsStaging.originalMKU
    },
    {
        method: 'GET',
        path: '/original/mme/{path*}',
        config: env == 'production'? controller.assets.originalMME: controller.assetsStaging.originalMME
    },
    {
        method: 'GET',
        path: '/original/mmf/{path*}',
        config: env == 'production'? controller.assets.originalMMF: controller.assetsStaging.originalMMF
    },
    {
        method: 'GET',
        path: '/original/mmu/{path*}',
        config: env == 'production'? controller.assets.originalMMU: controller.assetsStaging.originalMMU
    },
    {
        method: 'GET',
        path: '/original/std/{path*}',
        config: env == 'production'? controller.assets.originalSTD: controller.assetsStaging.originalSTD
    },
    {
        method: 'GET',
        path: '/original/sts/{path*}',
        config: env == 'production'? controller.assets.originalSTS: controller.assetsStaging.originalSTS
    },
    {
        method: 'GET',
        path: '/original/stsa/{path*}',
        config: env == 'production'? controller.assets.originalSTSA: controller.assetsStaging.originalSTSA
    },
    {
        method: 'GET',
        path: '/original/old/{path*}',
        config: env == 'production'? controller.assets.originalOLD: controller.assetsStaging.originalOLD
    },
    {
        method: 'GET',
        path: '/{path*}',
        handler: {
            file: Path.join(__dirname, 'index.htm')
        }
    }
];
