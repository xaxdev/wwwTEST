'use strict';
// import config from '../../config';
import * as data from './data';
import * as exports from './export';

const GetSearch = require('./utils/getSearch');
const GetAllData = require('./utils/getAllData');

const internals = {
  filters: []
};

const search = async params => {
  try {

    let obj = JSON.parse(params.content.toString());

    internals.query = GetSearch(obj, 0, 100000);

    const esData =  await esQuery(internals.query);
    const exportEs =  await exports.excel(esData, obj);

  } catch (err) {
      console.log('err-->',err);
      throw err;
  }
};

const esQuery = async document => {
    try {
        return await data.query(document);
    } catch (err) {
        throw err;
    }
}

export { search };
