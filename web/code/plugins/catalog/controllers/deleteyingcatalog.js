import Boom from 'boom'

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {
        try {
            const db = request.mongo.db
            const ObjectID = request.mongo.ObjectID
            const { id } = request.params

            await db.collection('YingCatalogName').deleteOne({ '_id' : new ObjectID(id) })
            await db.collection('YingCatalogDetail').deleteMany({ 'yingCatalogId' : id })

            reply.success()
        } catch (error) {
            reply(Boom.badImplementation('', error))
        }
    }
}