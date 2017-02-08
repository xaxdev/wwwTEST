import Path from 'path';
import config from '../../../config';
import * as file from '../utils/file';
import * as constant from './constant';
import { db } from '../utils/db';
import { es } from '../utils/es';

const getStoneLotNumbers = async (index, exchangeRates) => {
    try {
        console.log('StoneLotNumber!!!');
        const query = await file.read(Path.resolve(constant.STONESLOT_QUERY));
        const records = await db.exec(query, config.db);
        const lotNumber = [];
        let reference = '';

        for (let record of records) {
            if (record.type === 'STO') {
                const stoneLotNumber = {
                    reference: record.reference,
                    stoneType: record.subType,
                    stoneTypeName: record.subTypeName,
                    cut: record.cut,
                    cutName: record.cutName,
                    color: record.color,
                    colorName: record.colorName,
                    clarity: record.clarity,
                    clarityName: record.clarityName,
                    lotNumber: record.lotNumber,
                    lotQty: record.quantity,
                    carat: record.carat,
                    markup: record.markup,
                    certificateNo: record.CertificateNo,
                    laboratory: record.CertificateAgency,
                    certifiedDate: record.CertifiedDate
                };
                lotNumber.push(stoneLotNumber);
            }
        }
        await es.upload(lotNumber, {...config.elasticsearch, index, type: 'lotnumbers' });
    } catch (err) {
        throw err
    }
}

export { getStoneLotNumbers }
