import * as item from './item';
import * as constant from './constant';
import * as master from './master';

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
    } catch (err) {
        throw err;
    }
};

export { migrate };
