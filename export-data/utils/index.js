import getSearchBody from './getSearchBody';
import * as addTitles from './addTitles';
import * as addIngredients from './addIngredients';

const getBody = (obj, fromRecord, sizeRecord) => {
    return getSearchBody(obj, fromRecord, sizeRecord)
};

const getTitles = (result, obj) => {
    return addTitles.title(result, obj)
};

const getIngredients = (result, obj) => {
    return addIngredients.ingredient(result, obj)
};

const getSetItems = (result, obj) => {
    return addIngredients.setitems(result, obj)
};

export { getBody, getTitles, getIngredients, getSetItems };
