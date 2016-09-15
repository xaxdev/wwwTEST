const Boom = require('boom');
const Promise = require('bluebird');
const _ = require('lodash');

export default {
    save: (request, reply, item) => {

        return (async (request, reply, item) => {

            try {
                item = _.assign({ "userId": request.auth.credentials.id }, item)
                item = _.assign({ "displayStatus": true }, item)
                item = _.assign({ "lookUpDate": _.now() }, item)

                const db = request.server.plugins['hapi-mongodb'].db;
                return await db.collection('History')
                    .findOneAndReplace({ "userId": item.userId, "id": item.id }, item, { returnOriginal: false, upsert: true })
                    .then((value, err) => {
                        if (err) Promise.reject(err)
                        return Promise.resolve(item)
                    })
            } catch (e) {

                return Boom.badImplementation('', e)
            }
        })(request, reply, item);
    }
}
