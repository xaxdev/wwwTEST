import config from '../../../config';
import * as file from '../utils/file';
import * as core from './core';
import * as constant from './constant';
import * as mapper from './mapper';

const settings = async (index, type, path) => ({
    ...config,
    elasticsearch: {
        index: index,
        type: type,
        ...config.elasticsearch
    },
    mapper: mapper.mapMaster,
    query: await file.read(path)
});

const settingsArray = async (index, type, path) => ({
    elasticsearch: {
        index: index,
        type: type,
        ...config.elasticsearch
    },
    data: await require(path)
});

const settingsParallelize = async (index, type, path, table, field) => ({
    ...config,
    elasticsearch: {
        index: index,
        type: type,
        ...config.elasticsearch
    },
    mapper: mapper.mapMaster,
    parallelization: {
        table: table,
        field: field,
        template: await file.read(path),
        ...config.parallelization
    }
});

const getAccessoryType = async index => {
    try {
        console.log('AccessoryType!!!');
        const total = await core.get(await settings(index, 'accessoryTypes', constant.ACCESSORYTYPE_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getArticle = async index => {
    try {
        console.log('Article!!!');
        const total = await core.get(await settings(index, 'articles', constant.ARTICLE_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getSoldBrand = async index => {
    try {
        console.log('Sold Brand!!!');
        const total = await core.get(await settings(index, 'brands', constant.SOLD_BRAND_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getSoldBuckleType = async index => {
    try {
        console.log('Sold BuckleType!!!');
        const total = await core.get(await settings(index, 'buckleTypes', constant.SOLD_BUCKLETYPE_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getSoldCertificateAgency = async index => {
    try {
        console.log('Sold CertificateAgency!!!');
        const total = await core.get(await settings(index, 'certificateAgencys', constant.SOLD_CERTIFICATEAGENCY_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getSoldClarity= async index => {
    try {
        console.log('Sold Clarity!!!');
        const total = await core.get(await settings(index, 'clarities', constant.SOLD_CLARITY_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getSoldCollection= async index => {
    try {
        console.log('Sold Collection!!!');
        const total = await core.get(await settings(index, 'collections', constant.SOLD_COLLECTION_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getSoldColor = async index => {
    try {
        console.log('Sold Color!!!');
        const total = await core.get(await settings(index, 'colors', constant.SOLD_COLOR_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getCompany = async index => {
    try {
        console.log('Company!!!');
        const total = await core.get(await settings(index, 'companies', constant.COMPANY_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getCountry = async index => {
    try {
        console.log('Country!!!');
        const total = await core.get(await settings(index, 'countries', constant.COUNTRY_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getCurrency = async index => {
    try {
        console.log('Currency!!!');
        const total = await core.getFromArray(await settingsArray(index, 'currencies', constant.CURRENCY_DATA));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getCustomer = async index => {
    try {
        console.log('Customer!!!');
        const total = await core.parallelize(await settingsParallelize(index, 'customers', constant.CUSTOMER_QUERY, constant.CUSTOMER_TABLE, constant.CUSTOMER_ID));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getSoldCut = async index => {
    try {
        console.log('Sold Cut!!!');
        const total = await core.get(await settings(index, 'cut', constant.SOLD_CUT_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getSoldCutShap = async index => {
    try {
        console.log('SoldCutShap!!!');
        const total = await core.get(await settings(index, 'cutShap', constant.SOLD_CUTSHAP_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getSoldDialColor = async index => {
    try {
        console.log('SoldDialColor!!!');
        const total = await core.get(await settings(index, 'dialColors', constant.SOLD_DIALCOLOR_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getDialIndex = async index => {
    try {
        console.log('DialIndex!!!');
        const total = await core.get(await settings(index, 'dialIndexs', constant.DIALINDEX_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getSoldDialMetal = async index => {
    try {
        console.log('SoldDialMetal!!!');
        const total = await core.get(await settings(index, 'dialMetals', constant.SOLD_DIALMETAL_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getDominantStones = async index => {
    try {
        console.log('Dominant Stones!!!');
        const total = await core.get(await settings(index, 'dominantStones', constant.DOMINATSTONES_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getFluorescence = async index => {
    try {
        console.log('Fluorescence!!!');
        const total = await core.get(await settings(index, 'fluorescences', constant.FLUORESCENCE_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getGemstoneStoneType = async index => {
    try {
        console.log('Gemstone Stone Type!!!');
        const total = await core.get(await settings(index, 'gemstoneStoneType', constant.GEMSTONE_STONETYPE_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getHierarchy = async index => {
    try {
        console.log('Hierarchy!!!');
        const total = await core.get(await settings(index, 'hierarchy', constant.HIERARCHY_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getJewelryCategory = async index => {
    try {
        console.log('JewelryCategory!!!');
        const total = await core.get(await settings(index, 'jewelryCategories', constant.JEWELRYCATEGORY_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getLocation = async index => {
    try {
        console.log('Location!!!');
        const total = await core.get(await settings(index, 'locations', constant.LOCATION_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getSoldMetalColor = async index => {
    try {
        console.log('SoldMetalColor!!!');
        const total = await core.get(await settings(index, 'metalColours', constant.SOLD_METALCOLOR_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getSoldMetalType = async index => {
    try {
        console.log('SoldMetalType!!!');
        const total = await core.get(await settings(index, 'metalTypes', constant.SOLD_METALTYPE_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getSoldOrigin = async index => {
    try {
        console.log('SoldOrigin!!!');
        const total = await core.get(await settings(index, 'origins', constant.SOLD_ORIGIN_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getProductGroup = async index => {
    try {
        console.log('ProductGroup!!!');
        const total = await core.getFromArray(await settingsArray(index, 'productGroups', constant.PRODUCTGROUP_DATA));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getRole = async index => {
    try {
        console.log('Role!!!');
        const total = await core.getFromArray(await settingsArray(index, 'roles', constant.ROLE_DATA));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getSaleChannel = async index => {
    try {
        console.log('SaleChannel!!!');
        const total = await core.get(await settings(index, 'salechannels', constant.SALECHANNEL_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getSparePartType = async index => {
    try {
        console.log('SparePartType!!!');
        const total = await core.get(await settings(index, 'sparePartTypes', constant.SPAREPARTTYPE_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getStoneType = async index => {
    try {
        console.log('Stone Type!!!');
        const total = await core.get(await settings(index, 'stoneType', constant.STONETYPE_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getSoldStrapColor = async index => {
    try {
        console.log('SoldStrapColor!!!');
        const total = await core.get(await settings(index, 'strapColors', constant.SOLD_STRAPCOLOR_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getSoldStrapType = async index => {
    try {
        console.log('SoldStrapType!!!');
        const total = await core.get(await settings(index, 'strapTypes', constant.SOLD_STRAPTYPE_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getSymmetry = async index => {
    try {
        console.log('Symmetry!!!');
        const total = await core.get(await settings(index, 'symmetries', constant.SYMMETRY_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getWarehouse = async index => {
    try {
        console.log('Warehouse!!!');
        const total = await core.get(await settings(index, 'warehouses', constant.WAREHOUSE_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getWatchCategory = async index => {
    try {
        console.log('WatchCategory!!!');
        const total = await core.get(await settings(index, 'watchCategories', constant.WATCHCATEGORY_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getLotNumbers = async index => {
    try {
        console.log('LotNumbers!!!');
        const total = await core.get(await settings(index, 'lotnumbers', constant.STONESLOT_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

export {
    getCompany, getLocation, getWarehouse, getCountry, getSoldCut, getSoldCutShap, getSoldColor, getSoldClarity, getSymmetry, getFluorescence,
    getSoldCollection, getSoldBrand, getSoldMetalType, getSoldMetalColor, getSoldCertificateAgency, getDialIndex, getSoldDialColor,
    getSoldDialMetal, getSoldBuckleType, getSoldStrapType, getSoldStrapColor, getSoldOrigin, getCurrency, getRole, getProductGroup,
    getJewelryCategory, getWatchCategory, getAccessoryType, getSparePartType, getDominantStones, getGemstoneStoneType, getStoneType,
    getHierarchy, getLotNumbers, getArticle, getCustomer, getSaleChannel
};
