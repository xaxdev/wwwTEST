import { Db } from '../utils/db';
import { Es } from '../utils/es';

const probe = async params => {
    try {
        const query = `SELECT MIN(${params.field}) AS min, MAX(${params.field}) AS max FROM ${params.table}`;
        const db = new Db(params.db);
        const [record] = await db.exec(query, params.db);
        return record;
    } catch (err) {
        throw err;
    }
};

const get = async params => {
    try {
        // query from db
        const db = new Db(params.db);
        const recordset = await db.exec(params.query, params.db);

        if (recordset.length === 0) {
            return 0;
        }

        // map record to document
        const documents = params.mapper(recordset);

        // upload documents to Elasticsearch
        const es = new Es();
        await es.upload(documents, params.elasticsearch);

        return documents.length;
    } catch (err) {
        throw err;
    }
};

const parallelize = async params => {
    try {
        const range = await probe(params);
        const rounds = Math.ceil((range.max - range.min + 1) / params.size);
        let total = 0;

        for (let i = 0; i < rounds; i++) {
            const from =  (i * params.size) + Number(range.min);
            const to = (i * params.size) + params.size + Number(range.min) - 1;
            const query = params.template.replace('@from', from).replace('@to', to);
            const count =  await get({ ...params, query });
            total += count;
            console.log(`from ${from} to ${to}: ${count} processed.`);
        }

        return total;
    } catch (err) {
        throw err;
    }
};

export { parallelize, get };
