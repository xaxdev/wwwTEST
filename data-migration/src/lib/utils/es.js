import elasticsearch from 'elasticsearch';

const es =  {
    upload: async (documents, config) => {
        const client = new elasticsearch.Client({
            host: config.host
        });

        try {
            const body = [];

            for (let document of documents) {
                const action = { create: {} };

                if (document.id !== undefined) {
                    action.create['_id'] = document.id;
                }

                body.push(action);
                body.push(document);
            }

            await client.bulk({
                index: config.index,
                type: config.type,
                body
            });
        } catch (err) {
            throw err;
        } finally {
            client.close();
        }
    },

    alias: async (index, previous, name, config) => {
        const client = new elasticsearch.Client({
            host: config.host
        });

        try {
            await client.indices.deleteAlias({
                index: previous,
                name
            });

            await client.indices.putAlias({
                index,
                name
            });
        } catch (err) {
            throw err;
        } finally {
            client.close();
        }
    }
};

export { es };
