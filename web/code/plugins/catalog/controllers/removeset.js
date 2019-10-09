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

                await db.collection('SetCatalogName').deleteOne({ '_id' : new ObjectID(request.params.id) })
                await db.collection('SetCatalogItem').deleteMany({ 'setCatalogId' : new ObjectID(request.params.id) })
                await db.collection('SetCatalogShared').deleteOne({ 'setCatalogId' : new ObjectID(request.params.id), 'owner': request.auth.credentials.id })

                reply({
                    'status': true
                })
            } catch (e) {
                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
