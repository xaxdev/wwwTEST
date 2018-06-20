import * as item from './item';
import * as master from './master';
import * as es from './es';
import * as hierarchy from './hierarchy';
import * as set from './set';
import * as lot from './lot';
import * as soldItem from './solditem';
import * as constant from './constant';
import * as setSold from './setSold';

const migrate = async index => {
    try {
        const exchangeRates = await item.getExchangeRates();

        await item.getCertificates(index)
        await item.getJewelry(index, exchangeRates);
        await item.getLotNumbers(index, exchangeRates);
        await item.getStones(index, exchangeRates);
        await item.getWatches(index, exchangeRates);
        await item.getOBA(index, exchangeRates);
        await item.getAccessory(index, exchangeRates);
        await item.getSpareParts(index, exchangeRates);
        await item.getMovementActivities(index);
        await item.getGOC(index);

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
        await master.getArticle(index);
        await master.getCustomer(index);
        await master.getSaleChannel(index);

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
        console.log('Hierarchy!!!');
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

const soldItems= async index => {
    try {
        const allExchangeRates = await item.getAllExchangeRates();        
        // await soldItem.getSoldItems(index, allExchangeRates);
        await soldItem.getCertificates(index)
        await soldItem.getJewelry(index, allExchangeRates);
        await soldItem.getStones(index, allExchangeRates);
        await soldItem.getWatches(index, allExchangeRates);
        await soldItem.getOBA(index, allExchangeRates);
        await soldItem.getAccessory(index, allExchangeRates);
        await soldItem.getSpareParts(index, allExchangeRates);

    } catch (err) {
        throw err
    }
}

const soldItemsSets= async index => {
    try {
        const allExchangeRates = await item.getAllExchangeRates();  
        await setSold.getSoldItemSets(index, allExchangeRates)
    } catch (err) {
        throw err
    }
}

export { alias, migrate, productHierarchy, itemSets, soldItems, soldItemsSets };
