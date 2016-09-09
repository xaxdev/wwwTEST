const Boom = require('boom');
const Promise = require('bluebird');
const _ = require('lodash');

export default {
    save: (request, reply, item) => {

        var item = item;
        item = _.assign({ "userId": request.auth.credentials.id }, item)
        item = _.assign({ "displayStatus": true }, item)
        item = _.assign({ "lookUpDate": _.now() }, item)

        try {
            var db = request.server.plugins['hapi-mongodb'].db;
            db.collection('History').findOne({ "userId": item.userId, "id": item.id }, (err, result) => {

                // console.log("------------------------------------------------------------find error", err);
                if (err) return reply(Boom.badImplementation('', err));

                // console.log("------------------------------------------------------------find result", result);
                if (result) {
                    db.collection('History').updateOne({ "userId": item.userId, "id": item.id }, { $set: { "displayStatus": true, "lookUpDate": _.now() } }, (err, result) => {

                        // console.log("------------------------------------------------------------update error", err);
                        if (err) return reply(Boom.badImplementation('', err));

                        // console.log("------------------------------------------------------------update result", result);
                        // console.log("matchedCount", result.matchedCount);
                        // console.log("modifiedCount", result.modifiedCount);
                    });
                }
                else {
                    db.collection('History').insertOne(item, (err, result) => {

                        // console.log("------------------------------------------------------------insert error", err);
                        if (err) return reply(Boom.badImplementation('', err));

                        // console.log("insertedCount", result.insertedCount);
                    });
                }
            });
        } catch (e) {

            return reply(Boom.badImplementation('', e));
        }
    }
}
