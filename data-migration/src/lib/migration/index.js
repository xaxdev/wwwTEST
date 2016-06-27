import * as item from './item';
import * as master from './master';
import * as es from './es';

import * as constant from './constant';

const migrate = async index => {
    try {
        await item.getJewelry(index);
        await item.getStones(index);
        await item.getWatches(index);
        await item.getOBA(index);

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

        await master.getCurrency(index);
        await master.getRole(index);
        await master.getProductGroup(index);
    } catch (err) {
        throw err;
    }
};

const alias = async (index, previous, name) => {
    try {
        await es.alias(index, previous, name);
    } catch (err) {
        throw err;
    }
}

export { alias, migrate };
