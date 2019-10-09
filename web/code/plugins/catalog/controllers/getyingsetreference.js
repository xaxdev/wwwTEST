import Boom from 'boom'

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {
        try {
            const db = request.mongo.db
            const ObjectID = request.mongo.ObjectID
            const id = request.params.id

            const catalogDetail = await db.collection('YingCatalogDetail').find({ 'yingCatalogId': id }).sort({ id: 1 }).toArray()
            if(catalogDetail.length == 0) return reply(Boom.badRequest('Invalid YingCatalog Id.'))
            
            const data =  catalogDetail.map((item)=>{ return {'_id': item._id, 'setReference': item.setReference} })
            return reply({data});

        } catch (error) {
            reply(Boom.badImplementation('', error))
        }
    }
}