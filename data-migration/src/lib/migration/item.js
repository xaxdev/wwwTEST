import moment from 'moment-timezone';
import config from '../../../config';
import * as file from '../utils/file';
import * as core from './core';
import * as constant from './constant';
import * as mapper from '../utils/mapper';

const getJewelry = async _ => {
    try {
        const db = { ...config.db };
        db.database = constant.MAIN_DATABASE;

        const elasticsearch = {
            ...config.elasticsearch,
            index: `mol_${moment().format('YYYYMMDD')}`,
            type: 'items'
        };

        const total = await core.parallelize({
            db,
            table: constant.ITEM_TABLE,
            field: constant.ITEM_ID,
            size: config.size,
            template: await file.read(constant.JEWELRY_QUERY),
            elasticsearch,
            mapper: mapper.mapItem
        });

        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

export { getJewelry };
