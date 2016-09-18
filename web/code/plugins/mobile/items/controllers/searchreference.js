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
    handler: async (request, reply) => {

        const db = request.server.plugins['hapi-mongodb'].db
        const reference = request.params.reference
        const history = request.history
        const user = await history.getUserById(request, reply, request.auth.credentials.id)
        let fCondition = { "reference": reference }

        if (user.permission.onhandLocation.places.length != 0) {
            fCondition = _.assign({ "site": { $in: user.permission.onhandLocation.places }}, fCondition)
        }

        if (user.permission.onhandWarehouse.places.length != 0) {
            fCondition = _.assign({ "warehouse": { $in: user.permission.onhandWarehouse.places }}, fCondition)
        }

        db.collection('Items').findOne(fCondition)
        .then(async (item) => {

            if (!_.isNull(item)) {
                return await history.save(request, reply, item)
            }

            return reply(Boom.badRequest("Invalid item."))
        })
        .then((item) => {

            if (!_.isNull(item)) {
                item.actualCost = _.hasIn(item.actualCost, user.currency) ? _.result(item.actualCost, user.currency) : 0
                item.updatedCost = _.hasIn(item.updatedCost, user.currency) ? _.result(item.updatedCost, user.currency) : 0
                item.price = _.hasIn(item.price, user.currency) ? _.result(item.price, user.currency) : 0

                switch (user.permission.price.toUpperCase()) {
                    case "PUBLIC":
                        delete item.actualCost
                        delete item.updatedCost
                        break;
                    case "UPDATED":
                        delete item.actualCost
                        break;
                }

                return reply(JSON.stringify(item, null, 4))
            }

            return reply(Boom.badRequest("Invalid item."))
        })
        .catch(function(error) {

            return reply(Boom.badImplementation(error));
        });
    }
};
