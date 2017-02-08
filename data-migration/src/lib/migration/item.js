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
        type: 'items',
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

const getExchangeRates = async _ => {
    try {
        console.log('Exchange Rate!!!');
        const query = await file.read(constant.EXCHANGE_RATE_QUERY);
        return await db.exec(query, config.db);
    } catch (err) {
        throw err;
    }
};

const getJewelry = async (index, exchangeRates) => {
    try {
        console.log('Jewelry!!!');
        const total = await core.parallelize(await settings(index, exchangeRates, constant.JEWELRY_QUERY, mapper.mapItem));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getStones = async (index, exchangeRates) => {
    try {
        console.log('Stones!!!');
        const total = await core.parallelize(await settings(index, exchangeRates, constant.STONES_QUERY, mapper.mapStoneItem));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getWatches = async (index, exchangeRates) => {
    try {
        console.log('Watches!!!');
        const total = await core.parallelize(await settings(index, exchangeRates, constant.WATCHES_QUERY, mapper.mapItem));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getOBA = async (index, exchangeRates) => {
    try {
        console.log('OBA!!!');
        const total = await core.parallelize(await settings(index, exchangeRates, constant.OBA_QUERY, mapper.mapItem));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getCertificates = async index => {
    try {
        console.log('Certificates!!!');
        const total = await core.parallelize(await settings(index, null, constant.CERTIFICATE_QUERY, mapper.mapCertificate));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
}

const getAccessory = async (index, exchangeRates) => {
    try {
        console.log('Accessory!!!');
        const total = await core.parallelize(await settings(index, exchangeRates, constant.ACCESSORY_QUERY, mapper.mapItem));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getSpareParts = async (index, exchangeRates) => {
    try {
        console.log('Spare Parts!!!');
        const total = await core.parallelize(await settings(index, exchangeRates, constant.SPARE_PARTS_QUERY, mapper.mapItem));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const test = async (index, exchangeRates) => {
    try {
        console.log('TEST!!!');
        const query = await file.read('./query/test.sql');
        const recordset = await db.exec(query, config.db);
        const documents = mapper.mapItem(recordset, exchangeRates);
        console.log(JSON.stringify(documents, null, 4));
    } catch (err) {
        throw err;
    }
};

export { getExchangeRates, getJewelry, getStones, getWatches, getOBA, getCertificates, getAccessory, getSpareParts };
