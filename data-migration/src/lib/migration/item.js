import config from '../../../config';
import * as file from '../utils/file';
import * as core from './core';
import * as constant from './constant';
import * as mapper from './mapper';

const settings = async (index, path) => ({
    ...config,
    elasticsearch: {
        index: index,
        type: 'items',
        ...config.elasticsearch
    },
    mapper: mapper.mapItem,
    parallelization: {
        table: constant.ITEM_TABLE,
        field: constant.ITEM_ID,
        template: await file.read(path),
        ...config.parallelization
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

const getWatches = async index => {
    try {
        console.log('Watches!!!');
        const total = await core.parallelize(await settings(index, constant.WATCHES_QUERY));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getOBA = async index => {
    try {
        console.log('OBA!!!');
        const total = await core.parallelize(await settings(index, constant.OBA_QUERY));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

export { getJewelry, getStones, getWatches, getOBA };
