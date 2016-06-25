import config from '../../../config';
import { es } from '../utils/es';

const alias = async (index, previous, name) => {
    try {
        await es.alias(index, previous, name, {
            ...config.elasticsearch
        });
    } catch (err) {
        throw err;
    }
};

export { alias };
