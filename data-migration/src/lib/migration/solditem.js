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

const getSoldItems = async (index, allExchangeRates) => {
    try {
        console.log('SoldItems!!!');
        const total = await core.parallelize(await settingsSoldItem(index, allExchangeRates, constant.SOLDITEM_QUERY, mapper.mapSoldItem));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};
const getCertificates = async index => {
    try {
        console.log('SoldItems Certificates!!!');
        const total = await core.parallelize(await settingsSoldItem(index, null, constant.SOLDITEM_CERTIFICATE_QUERY, mapper.mapCertificate));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
}
const getJewelry = async (index, allExchangeRates) => {
    try {
        console.log('SoldItems Jewelry!!!');
        const total = await core.parallelize(await settingsSoldItem(index, allExchangeRates, constant.SOLDITEM_JEWELRY_QUERY, mapper.mapSoldItem));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};
const getStones = async (index, allExchangeRates) => {
    try {
        console.log('SoldItems Stones!!!');
        const total = await core.parallelize(await settingsSoldItem(index, allExchangeRates, constant.SOLDITEM_STONES_QUERY, mapper.mapSoldItem));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};
const getWatches = async (index, allExchangeRates) => {
    try {
        console.log('SoldItems Watches!!!');
        const total = await core.parallelize(await settingsSoldItem(index, allExchangeRates, constant.SOLDITEM_WATCHES_QUERY, mapper.mapSoldItem));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};
const getOBA = async (index, allExchangeRates) => {
    try {
        console.log('SoldItems OBA!!!');
        const total = await core.parallelize(await settingsSoldItem(index, allExchangeRates, constant.SOLDITEM_OBA_QUERY, mapper.mapSoldItem));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};
const getAccessory = async (index, allExchangeRates) => {
    try {
        console.log('SoldItems Accessory!!!');
        const total = await core.parallelize(await settingsSoldItem(index, allExchangeRates, constant.SOLDITEM_ACCESSORY_QUERY, mapper.mapSoldItem));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};
const getSpareParts = async (index, allExchangeRates) => {
    try {
        console.log('SoldItems Spare Parts!!!');
        const total = await core.parallelize(await settingsSoldItem(index, allExchangeRates, constant.SOLDITEM_SPARE_PARTS_QUERY, mapper.mapSoldItem));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

export { getSoldItems, getCertificates, getJewelry, getStones, getWatches, getOBA, getAccessory, getSpareParts, };
