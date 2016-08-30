import * as item from './item';
import * as master from './master';
import * as es from './es';
import * as hierarchy from './hierarchy'
import * as set from './set'

import * as constant from './constant';

const migrate = async index => {
    try {
        const exchangeRates = await item.getExchangeRates();
        await item.getCertificates(index)
        await item.getJewelry(index, exchangeRates);
        await item.getStones(index, exchangeRates);
        await item.getWatches(index, exchangeRates);
        // await item.getOBA(index, exchangeRates);

        await master.getCompany(index);
        await master.getLocation(index);
        await master.getWarehouse(index);
        await master.getCountry(index);
        await master.getCut(index);
        await master.getCutShap(index);
        await master.getColor(index);
        await master.getClarity(index);
        await master.getSymmetry(index);
        await master.getFluorescence(index);
        await master.getOrigin(index);
        await master.getCollection(index);
        await master.getBrand(index);
        await master.getMetalType(index);
        await master.getMetalColor(index);
        await master.getCertificateAgency(index);
        await master.getDialIndex(index);
        await master.getDialColor(index);
        await master.getDialMetal(index);
        await master.getBuckleType(index);
        await master.getStrapType(index);
        await master.getStrapColor(index);
        await master.getJewelryCategory(index);
        await master.getWatchCategory(index);
        await master.getAccessoryType(index);
        await master.getSparePartType(index);

        await master.getCurrency(index);
        await master.getRole(index);
        await master.getProductGroup(index);

        await master.getDominantStones(index);
        await master.getGemstoneStoneType(index);
        await master.getStoneType(index);
        await master.getHierarchy(index);
    } catch (err) {
        throw err;
    }
};

const alias = async (index, name) => {
    try {
        await es.alias(index, name);
    } catch (err) {
        throw err;
    }
}

const productHierarchy = async _ => {
    try {
        await hierarchy.getSources()
    } catch (err) {
        throw err
    }
}

const itemSets= async index => {
    try {
        const exchangeRates = await item.getExchangeRates()
        await set.getitemSets(index, exchangeRates)
    } catch (err) {
        throw err
    }
}

export { alias, migrate, productHierarchy, itemSets };
