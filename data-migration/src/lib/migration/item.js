import config from '../../../config';
import * as file from '../utils/file';
import * as core from './core';
import * as constant from './constant';
import * as mapper from '../utils/mapper';

const settings = async (index, path) => ({
    ...config,
    elasticsearch: {
        index: index,
        type: 'items',
        ...config.elasticsearch
    },
    mapper: mapper.mapItem,
    query: {
        table: constant.ITEM_TABLE,
        field: constant.ITEM_ID,
        template: await file.read(path),
        ...config.query
    }
});

const getJewelry = async index => {
    try {
        console.log('Jewelry!!!');
        const total = await core.parallelize(await settings(index, constant.JEWELRY_QUERY));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getStones = async index => {
    try {
        console.log('Stones!!!');
        const total = await core.parallelize(await settings(index, constant.STONES_QUERY));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

export { getJewelry, getStones };
