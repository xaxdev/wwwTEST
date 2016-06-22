import mssql from 'mssql';

export class Db {
    async exec(query, config) {
        const connection = new mssql.Connection(config);
        try {
            await connection.connect();
            return await new mssql.Request(connection).query(query);
        } catch (err) {
            throw err;
        } finally {
            connection.close();
        }
    }
};
