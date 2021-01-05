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

                const findExist = await db.collection('YingCatalogName').find({ '_id' : new ObjectID(request.payload.id), 'name': request.payload.name, 'userId': request.auth.credentials.id }).toArray()
                if (findExist.length) {
                    reply.success()
                }
                else {
                    await db.collection('YingCatalogName').updateOne({ '_id' : new ObjectID(request.payload.id) }, { $set: { 'name': request.payload.name } })
                    reply.success()
                }
                reply.success()
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
