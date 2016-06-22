import * as item from './item';
import * as constant from './constant';

const migrate = async index => {
    try {
        await item.getJewelry(index);
        await item.getStones(index);
    } catch (err) {
        throw err;
    }
};

export { migrate };
