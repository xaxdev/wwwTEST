const Boom = require('boom');
const Promise = require('bluebird');
const _ = require('lodash');

export default {
    save: (request, reply, item) => {

        return (async (request, reply, item) => {

            try {
                const db = request.server.plugins['hapi-mongodb'].db;
                return await db.collection('History')
                    .findOneAndUpdate({ "userId": request.auth.credentials.id, "itemId": item.id } , { $set: { "displayStatus": true, "lookUpDate": _.now() }}, { returnOriginal: false, upsert: true })
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
