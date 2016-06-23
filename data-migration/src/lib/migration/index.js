import * as item from './item';
import * as constant from './constant';

const migrate = async index => {
    try {
        await item.getJewelry(index);
        await item.getStones(index);
        await item.getWatches(index);
    } catch (err) {
        throw err;
    }
};

export { migrate };
