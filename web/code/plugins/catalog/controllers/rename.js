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

                var findExist = await db.collection('CatalogName').find({ "_id" : new ObjectID(request.payload.id), "catalog": request.payload.catalog }).toArray()
                if (findExist.length) {
                    reply(Boom.badRequest("Your require name is existing."))
                }
                else {
                    await db.collection('CatalogName').updateOne({ "_id" : new ObjectID(request.payload.id) }, { $set: { "catalog": request.payload.catalog } })
                    reply({ "status": true })
                }
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
