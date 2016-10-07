import getSearchBody from './getSearchBody';
import * as addTitles from './addTitles';
import * as addIngredients from './addIngredients';

const getBody = (obj) => {
    return getSearchBody(obj)
};

const getTitles = (result, obj) => {
    return addTitles.title(result, obj)
};

const getIngredients = (result, obj) => {
    return addIngredients.ingredient(result, obj)
};

export { getBody, getTitles, getIngredients };
