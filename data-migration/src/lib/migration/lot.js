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

export { getLotNumbers }
