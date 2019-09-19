import Boom from 'boom'

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID

                const findExist = await db.collection('CatalogName').find({ '_id' : new ObjectID(request.payload.id), 'catalog': request.payload.catalog, 'userId': request.auth.credentials.id }).toArray()
                if (findExist.length) {
                    reply.success()
                }
                else {
                    await db.collection('CatalogName').updateOne({ '_id' : new ObjectID(request.payload.id) }, { $set: { 'catalog': request.payload.catalog } })
                    reply.success()
                }
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
