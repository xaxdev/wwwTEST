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
