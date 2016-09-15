const Boom = require('boom')

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const db = request.server.plugins['hapi-mongodb'].db
                const ObjectID = request.server.plugins['hapi-mongodb'].ObjectID

                await db.collection('CatalogName').deleteOne({ "_id" : new ObjectID(request.params.id) })
                await db.collection('CatalogItem').deleteMany({ "catalogId" : new ObjectID(request.params.id) })
                reply({
                    "status": true
                })
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
