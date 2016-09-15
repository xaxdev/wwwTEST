const Boom = require('boom');
const Promise = require('bluebird');
const _ = require('lodash');
const internals = {
    filters: []
};

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        const db = request.server.plugins['hapi-mongodb'].db
        const reference = request.params.reference;
        const history = request.history;

        db.collection('Items').findOne({ "reference": reference })
        .then(async (item) => {

            if (!_.isNull(item)) {
                return await history.save(request, reply, item)
            }

            return reply(Boom.badRequest("Invalid item."))
        })
        .then((item) => {

            if (!_.isNull(item)) {
                return reply(JSON.stringify(item, null, 4))
            }

            return reply(Boom.badRequest("Invalid item."))
        })
        .catch(function(error) {

            return reply(Boom.badImplementation(error));
        });
    }
};
