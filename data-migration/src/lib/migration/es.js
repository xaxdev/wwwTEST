import config from '../../../config';
import { es } from '../utils/es';

const alias = async (index, name) => {
    try {
        await es.alias(index, name, {
            ...config.elasticsearch
        });
    } catch (err) {
        throw err;
    }
};

export { alias };
