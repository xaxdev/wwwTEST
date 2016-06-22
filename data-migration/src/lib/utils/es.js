import elasticsearch from 'elasticsearch';

export class Es {
    async upload(documents, config) {
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
    }
}
