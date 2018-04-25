import config from '../../../config';
import * as file from '../utils/file';
import * as core from './core';
import * as constant from './constant';
import * as mapper from './mapper';
import { db } from '../utils/db';

const settingsSoldItem = async (index, exchangeRates, path, mapper) => ({
    ...config,
    elasticsearch: {
        index: index,
        type: 'solditems',
        ...config.elasticsearch
    },
    mapper,
    parallelization: {
        table: constant.SOLDITEM_TABLE,
        field: constant.SOLDITEM_ID,
        template: await file.read(path),
        ...config.parallelization
    },
    exchangeRates
});

const getSoldItems = async (index, exchangeRates) => {
    try {
        console.log('SoldItems!!!');
        const total = await core.parallelize(await settingsSoldItem(index, exchangeRates, constant.SOLDITEM_QUERY, mapper.mapSoldItem));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

export { getSoldItems };
