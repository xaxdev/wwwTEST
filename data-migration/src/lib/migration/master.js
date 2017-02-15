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

const getCompany = async index => {
    try {
        console.log('Company!!!');
        const total = await core.get(await settings(index, 'companies', constant.COMPANY_QUERY));
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

const getWarehouse = async index => {
    try {
        console.log('Warehouse!!!');
        const total = await core.get(await settings(index, 'warehouses', constant.WAREHOUSE_QUERY));
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

const getCut = async index => {
    try {
        console.log('Cut!!!');
        const total = await core.get(await settings(index, 'cut', constant.CUT_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getCutShap = async index => {
    try {
        console.log('CutShap!!!');
        const total = await core.get(await settings(index, 'cutShap', constant.CUTSHAP_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getColor = async index => {
    try {
        console.log('Color!!!');
        const total = await core.get(await settings(index, 'colors', constant.COLOR_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getClarity= async index => {
    try {
        console.log('Clarity!!!');
        const total = await core.get(await settings(index, 'clarities', constant.CLARITY_QUERY));
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

const getFluorescence = async index => {
    try {
        console.log('Fluorescence!!!');
        const total = await core.get(await settings(index, 'fluorescences', constant.FLUORESCENCE_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getOrigin = async index => {
    try {
        console.log('Origin!!!');
        const total = await core.get(await settings(index, 'origins', constant.ORIGIN_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getCollection= async index => {
    try {
        console.log('Collection!!!');
        const total = await core.get(await settings(index, 'collections', constant.COLLECTION_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getBrand = async index => {
    try {
        console.log('Brand!!!');
        const total = await core.get(await settings(index, 'brands', constant.BRAND_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getMetalType = async index => {
    try {
        console.log('MetalType!!!');
        const total = await core.get(await settings(index, 'metalTypes', constant.METALTYPE_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getMetalColor = async index => {
    try {
        console.log('MetalColor!!!');
        const total = await core.get(await settings(index, 'metalColours', constant.METALCOLOR_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getCertificateAgency = async index => {
    try {
        console.log('CertificateAgency!!!');
        const total = await core.get(await settings(index, 'certificateAgencys', constant.CERTIFICATEAGENCY_QUERY));
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

const getDialColor = async index => {
    try {
        console.log('DialColor!!!');
        const total = await core.get(await settings(index, 'dialColors', constant.DIALCOLOR_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getDialMetal = async index => {
    try {
        console.log('DialMetal!!!');
        const total = await core.get(await settings(index, 'dialMetals', constant.DIALMETAL_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getBuckleType = async index => {
    try {
        console.log('BuckleType!!!');
        const total = await core.get(await settings(index, 'buckleTypes', constant.BUCKLETYPE_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getStrapType = async index => {
    try {
        console.log('StrapType!!!');
        const total = await core.get(await settings(index, 'strapTypes', constant.STRAPTYPE_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getStrapColor = async index => {
    try {
        console.log('StrapColor!!!');
        const total = await core.get(await settings(index, 'strapColors', constant.STRAPCOLOR_QUERY));
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

const getWatchCategory = async index => {
    try {
        console.log('WatchCategory!!!');
        const total = await core.get(await settings(index, 'watchCategories', constant.WATCHCATEGORY_QUERY));
        console.log(`${total} records were processed in total.`);
    } catch (err) {
        throw err;
    }
};

const getAccessoryType = async index => {
    try {
        console.log('AccessoryType!!!');
        const total = await core.get(await settings(index, 'accessoryTypes', constant.ACCESSORYTYPE_QUERY));
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

const getCurrency = async index => {
    try {
        console.log('Currency!!!');
        const total = await core.getFromArray(await settingsArray(index, 'currencies', constant.CURRENCY_DATA));
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

const getProductGroup = async index => {
    try {
        console.log('ProductGroup!!!');
        const total = await core.getFromArray(await settingsArray(index, 'productGroups', constant.PRODUCTGROUP_DATA));
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

const getGemstoneStoneType = async index => {
    try {
        console.log('Gemstone Stone Type!!!');
        const total = await core.get(await settings(index, 'gemstoneStoneType', constant.GEMSTONE_STONETYPE_QUERY));
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

const getHierarchy = async index => {
    try {
        console.log('Hierarchy!!!');
        const total = await core.get(await settings(index, 'hierarchy', constant.HIERARCHY_QUERY));
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

export { getCompany, getLocation, getWarehouse, getCountry, getCut, getCutShap, getColor, getClarity, getSymmetry,
        getFluorescence, getCollection, getBrand, getMetalType, getMetalColor, getCertificateAgency, getDialIndex,
        getDialColor, getDialMetal, getBuckleType, getStrapType, getStrapColor, getOrigin, getCurrency, getRole,
        getProductGroup, getJewelryCategory, getWatchCategory, getAccessoryType, getSparePartType
        , getDominantStones, getGemstoneStoneType, getStoneType, getHierarchy, getLotNumbers
      };
