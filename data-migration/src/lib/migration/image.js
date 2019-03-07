import config from '../../../config';
import * as file from '../utils/file';
import * as core from './core';
import * as constant from './constant';
import * as mapper from './mapper';
import { db } from '../utils/db';
import moment from 'moment-timezone';

const settings = async (index, exchangeRates, path, mapper) => ({
    ...config,
    elasticsearch: {
        index: index,
        type: 'imageothermmeonhand',
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

const getImageMMEJewelry = async (index, exchangeRates) => {
    try {
        console.log('Image MME Jewelry!!!');
        const total = await core.parallelize(await settings(index, exchangeRates, constant.IMAGE_JEWELRY_QUERY, mapper.mapImage));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getImageMMEStones = async (index, exchangeRates) => {
    try {
        console.log('Image MME Stones!!!');
        const total = await core.parallelize(await settings(index, exchangeRates, constant.IMAGE_STONES_QUERY, mapper.mapImage));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getImageMMEWatches = async (index, exchangeRates) => {
    try {
        console.log('Image MME Watches!!!');
        const total = await core.parallelize(await settings(index, exchangeRates, constant.IMAGE_WATCHES_QUERY, mapper.mapImage));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getImageMMEOBA = async (index, exchangeRates) => {
    try {
        console.log('Image MME OBA!!!');
        const total = await core.parallelize(await settings(index, exchangeRates, constant.IMAGE_OBA_QUERY, mapper.mapImage));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getImageMMEAccessory = async (index, exchangeRates) => {
    try {
        console.log('Image MME Accessory!!!');
        const total = await core.parallelize(await settings(index, exchangeRates, constant.IMAGE_ACCESSORY_QUERY, mapper.mapImage));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getImageMMESpareParts = async (index, exchangeRates) => {
    try {
        console.log('Image MME Spare Parts!!!');
        const total = await core.parallelize(await settings(index, exchangeRates, constant.IMAGE_SPARE_PARTS_QUERY, mapper.mapImage));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

export { getImageMMEJewelry, getImageMMEStones, getImageMMEWatches, getImageMMEOBA, getImageMMEAccessory, getImageMMESpareParts };
