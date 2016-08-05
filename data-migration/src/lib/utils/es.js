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

    alias: async (index, name, config) => {
        const client = new elasticsearch.Client({
            host: config.host
        });

        try {
            const result = await client.indices.getAlias({ name });
            const indices = Object.keys(result);
            if (indices.length > 0) {
                await client.indices.deleteAlias({ index: indices, name });
            }
        } catch (err) {
            if (err.message === `alias [${name}] missing`) {
                console.log(`Failed to find the ${name} alias.`);
                return;
            }

            throw err;
        } finally {
            await client.indices.putAlias({ index, name });
            client.close();
        }
    }
};

export { es };
