import getSearchBody from './getSearchBody';
import getSearchSoldItemBody from './getSearchSoldItemBody';
import createExcelOnHand from './createExcelOnHand';
import createExcelSoldItem from './createExcelSoldItem';
import * as addTitles from './addTitles';
import * as addSoldItemTitles from './addSoldItemTitles';
import * as addIngredients from './addIngredients';
import * as addSoldItemIngredients from './addSoldItemIngredients';
import * as file from './file';

const getBody = (obj, fromRecord, sizeRecord) => {
    return getSearchBody(obj, fromRecord, sizeRecord)
};

const getSoldItemBody = (obj, fromRecord, sizeRecord) => {
    return getSearchSoldItemBody(obj, fromRecord, sizeRecord)
};

const getTitles = (result, obj) => {
    return addTitles.title(result, obj)
};

const getSoldItemTitles = (result, obj) => {
    return addSoldItemTitles.title(result, obj)
};

const getIngredients = (result, obj) => {
    return addIngredients.ingredient(result, obj)
};

const getSoldItemIngredients = (result, obj) => {
    return addSoldItemIngredients.ingredient(result, obj)
};

const getSetItems = (result, obj) => {
    return addIngredients.setitems(result, obj)
};

const saveFile = (files, wb) => {
    return file.save(files, wb)
};

const notifyFile = (err, userEmail, emailBody) => {
    return file.notify(err, userEmail, emailBody)
};

const fileExists = (filePath) => {
    return file.fileExists(filePath)
};

const excelOnHand = (obj, config, parameter, body, utils, userEmail, channel, msg) => {
    return createExcelOnHand(obj, config, parameter, body, utils, userEmail, channel, msg)
};

const excelSoldItem = (obj, config, parameter, body, utils, userEmail, channel, msg) => {
    return createExcelSoldItem(obj, config, parameter, body, utils, userEmail, channel, msg)
};

export { getBody, getSoldItemBody, getTitles, getSoldItemTitles, getIngredients, getSetItems, saveFile, notifyFile, fileExists, excelOnHand, excelSoldItem,
    getSoldItemIngredients
};
