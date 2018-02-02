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

                var findExist = await db.collection('SetCatalogName').find({ '_id' : new ObjectID(request.payload.id), 'setCatalog': request.payload.setCatalog, 'userId': request.auth.credentials.id }).toArray()
                if (findExist.length) {
                    reply.success()
                }
                else {
                    await db.collection('SetCatalogName').updateOne({ '_id' : new ObjectID(request.payload.id) }, { $set: { 'setCatalog': request.payload.setCatalog } })
                    reply.success()
                }
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
