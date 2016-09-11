const Boom = require('boom')
const _ = require('lodash')

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const db = request.server.plugins['hapi-mongodb'].db
                const ObjectID = request.server.plugins['hapi-mongodb'].ObjectID
                const wlistId = request.payload.id

                if (_.isNull(wlistId)) {
                    console.log("do new");
                }
                else {
                    console.log("do update");
                }

                reply(await db.collection('Wishlist').find({ "userId": request.auth.credentials.id }).toArray())
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
