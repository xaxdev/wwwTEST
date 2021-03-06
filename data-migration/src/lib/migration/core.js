import { db } from '../utils/db';
import { es } from '../utils/es';

const probe = async params => {
    try {
        const query = `SELECT MIN(${params.parallelization.field}) AS min, MAX(${params.parallelization.field}) AS max FROM ${params.parallelization.table}`;
        const [record] = await db.exec(query, params.db);
        return record;
    } catch (err) {
        throw err;
    }
};

const probeNewSoldItem = async params => {
    try {
        const query = `SELECT MIN(${params.parallelization.field}) AS min, MAX(${params.parallelization.field}) AS max FROM ${params.parallelization.table} WHERE [Id] > 2000000000`;
        const [record] = await db.exec(query, params.db);
        return record;
    } catch (err) {
        throw err;
    }
};

const probeOldSoldItem = async params => {
    try {
        const query = `SELECT MIN(${params.parallelization.field}) AS min, MAX(${params.parallelization.field}) AS max FROM ${params.parallelization.table} WHERE [Id] < 5000000000`;
        const [record] = await db.exec(query, params.db);
        return record;
    } catch (err) {
        throw err;
    }
};

const get = async params => {
    try {
        // query from db
        const recordset = await db.exec(params.query, params.db);
        if (recordset.length === 0) {
            return 0;
        }

        // map record to document
        const documents = await params.mapper(recordset, params.exchangeRates);
        // upload documents to Elasticsearch
        await es.upload(documents, params.elasticsearch);

        return documents.length;
    } catch (err) {
        throw err;
    }
};

const parallelize = async params => {
    try {
        const range = await probe(params);
        const rounds = Math.ceil((range.max - range.min + 1) / params.parallelization.size);
        let total = 0;

        for (let i = 0; i < rounds; i++) {
            const from =  (i * params.parallelization.size) + Number(range.min);
            const to = (i * params.parallelization.size) + params.parallelization.size + Number(range.min) - 1;
            const query = params.parallelization.template.replace('@from', from).replace('@to', to);
            const count =  await get({
                ...params,
                query
            });
            total += count;
            console.log(`from ${from} to ${to}: ${count} processed.`);
        }

        return total;
    } catch (err) {
        throw err;
    }
};

const getFromArray = async params => {
    try {
        const data = params.data;

        // map record to document
        const documents = data;

        // upload documents to Elasticsearch
        await es.upload(documents, params.elasticsearch);

        return documents.length;
    } catch (err) {
        throw err;
    }
};

const parallelizeSoldItem = async params => {
    try {
        const range = await probeNewSoldItem(params);
        const rounds = Math.ceil((range.max - range.min + 1) / params.parallelization.size);

        const rangeOld = await probeOldSoldItem(params);
        const roundsOld = Math.ceil((rangeOld.max - rangeOld.min + 1) / params.parallelization.size);

        let total = 0;

        // transfer old data

        for (let i = 0; i < roundsOld; i++) {
            const from =  (i * params.parallelization.size) + Number(rangeOld.min);
            const to = (i * params.parallelization.size) + params.parallelization.size + Number(rangeOld.min) - 1;
            const query = params.parallelization.template.replace('@from', from).replace('@to', to);
            const count =  await get({
                ...params,
                query
            });
            total += count;
            console.log(`from ${from} to ${to}: ${count} processed.`);
        }

        // transfer new data

        for (let i = 0; i < rounds; i++) {
            const from =  (i * params.parallelization.size) + Number(range.min);
            const to = (i * params.parallelization.size) + params.parallelization.size + Number(range.min) - 1;
            const query = params.parallelization.template.replace('@from', from).replace('@to', to);
            const count =  await get({
                ...params,
                query
            });
            total += count;
            console.log(`from ${from} to ${to}: ${count} processed.`);
        }

        return total;
    } catch (err) {
        throw err;
    }
};

export { parallelize, get, getFromArray, parallelizeSoldItem };
