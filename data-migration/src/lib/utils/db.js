import mssql from 'mssql';

const db = {
    exec: async (query, config) => {
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

export { db };
