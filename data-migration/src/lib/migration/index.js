import * as item from './item';
import * as constant from './constant';

const migrate = async _ => {
    try {
        await item.getJewelry();
    } catch (err) {
        throw err;
    }
};

export { migrate };
