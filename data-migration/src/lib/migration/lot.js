import config from '../../../config';
import * as file from '../utils/file';
import * as core from './core';
import * as constant from './constant';
import * as mapper from './mapper';
import { db } from '../utils/db';

const settings = async (index, exchangeRates, path, mapper) => ({
    ...config,
    elasticsearch: {
        index: index,
        type: 'lotnumbers',
        ...config.elasticsearch
    },
    mapper,
    parallelization: {
        table: constant.ITEM_TABLE,
        field: constant.ITEM_ID,
        template: await file.read(path),
        ...config.parallelization
    },
    exchangeRates
});

const getLotNumbers = async (index, exchangeRates) => {
    try {
        console.log('LotNumber!!!');
        const total = await core.parallelize(await settings(index, exchangeRates, constant.STONESLOT_QUERY, mapper.mapStoneLotNumber));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

// const getStoneLotNumbers = async (index, exchangeRates) => {
//     try {
//         console.log('StoneLotNumber!!!');
//         const query = await file.read(Path.resolve(constant.STONESLOT_QUERY));
//         const records = await db.exec(query, config.db);
//         const lotNumber = [];
//         let reference = '';
//
//         for (let record of records) {
//             if (record.type === 'STO') {
//                 const stoneLotNumber = {
//                     reference: record.reference,
//                     stoneType: record.subType,
//                     stoneTypeName: record.subTypeName,
//                     cut: record.cut,
//                     cutName: record.cutName,
//                     color: record.color,
//                     colorName: record.colorName,
//                     clarity: record.clarity,
//                     clarityName: record.clarityName,
//                     lotNumber: record.lotNumber,
//                     lotQty: record.quantity,
//                     carat: record.carat,
//                     markup: record.markup,
//                     certificateNo: record.CertificateNo,
//                     laboratory: record.CertificateAgency,
//                     certifiedDate: record.CertifiedDate
//                 };
//                 lotNumber.push(stoneLotNumber);
//             }
//         }
//         console.log(config.elasticsearch);
//         console.log(lotNumber.length);
//         await es.upload(lotNumber, {...config.elasticsearch, index, type: 'lotnumbers' });
//     } catch (err) {
//         throw err
//     }
// }

export { getLotNumbers }
