import config from '../../config';
import { get } from './utils/es';

const query = async document => {
    try {
        return await get(document, {
            ...config.elasticsearch
        })
        // console.log('result-->',result);
    } catch (err) {
        throw err;
    }
};

export { query };
