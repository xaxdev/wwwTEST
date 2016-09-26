const Boom = require('boom');
const Promise = require('bluebird');

export default {
    save: (request, reply, item) => {

        return (async (request, reply, item) => {

            try {
                const db = request.mongo.db

                return await db.collection('History').findOneAndUpdate({
                    "userId": request.auth.credentials.id,
                    "itemId": item.id
                },
                {
                    $currentDate: {
                        "lastModified": true
                    },
                    $set: {
                        "reference": item.reference,
                        "description": item.description,
                        "displayStatus": true
                    }
                },
                {
                    upsert: true,
                    returnNewDocument: true
                })
                .then((value, err) => {

                    if (err) return Promise.reject(err)
                    return Promise.resolve(item)
                })
            } catch (e) {

                return Boom.badImplementation('', e)
            }
        })(request, reply, item);
    }
}
