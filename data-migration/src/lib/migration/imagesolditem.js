import config from '../../../config';
import * as file from '../utils/file';
import * as core from './core';
import * as constant from './constant';
import * as mapper from './mapper';

const settings = async (index, exchangeRates, path, mapper) => ({
    ...config,
    elasticsearch: {
        index: index,
        type: 'imageothermmesolditem',
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

const getImageMMEJewelrySolditem = async (index, exchangeRates) => {
    try {
        console.log('Image MME SoldItems Jewelry!!!');
        const total = await core.parallelize(await settings(index, exchangeRates, constant.SOLDITEM_IMAGE_JEWELRY_QUERY, mapper.mapImageSoldItem));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getImageMMEStonesSolditem = async (index, exchangeRates) => {
    try {
        console.log('Image MME SoldItems Stones!!!');
        const total = await core.parallelize(await settings(index, exchangeRates, constant.SOLDITEM_IMAGE_STONES_QUERY, mapper.mapImageSoldItem));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getImageMMEWatchesSolditem = async (index, exchangeRates) => {
    try {
        console.log('Image MME SoldItems Watches!!!');
        const total = await core.parallelize(await settings(index, exchangeRates, constant.SOLDITEM_IMAGE_WATCHES_QUERY, mapper.mapImageSoldItem));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getImageMMEOBASolditem = async (index, exchangeRates) => {
    try {
        console.log('Image MME SoldItems OBA!!!');
        const total = await core.parallelize(await settings(index, exchangeRates, constant.SOLDITEM_IMAGE_OBA_QUERY, mapper.mapImageSoldItem));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getImageMMEAccessorySolditem = async (index, exchangeRates) => {
    try {
        console.log('Image MME SoldItems Accessory!!!');
        const total = await core.parallelize(await settings(index, exchangeRates, constant.SOLDITEM_IMAGE_ACCESSORY_QUERY, mapper.mapImageSoldItem));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getImageMMESparePartsSolditem = async (index, exchangeRates) => {
    try {
        console.log('Image MME SoldItems Spare Parts!!!');
        const total = await core.parallelize(await settings(index, exchangeRates, constant.SOLDITEM_IMAGE_SPARE_PARTS_QUERY, mapper.mapImageSoldItem));
        console.log(`${total} items were processed in total.`);
    } catch (err) {
        throw err;
    }
};

export {
    getImageMMEJewelrySolditem, getImageMMEStonesSolditem, getImageMMEWatchesSolditem, getImageMMEOBASolditem, getImageMMEAccessorySolditem,
    getImageMMESparePartsSolditem
};
