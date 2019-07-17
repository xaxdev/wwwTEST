import Boom from 'boom'

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {
        try {
            const db = request.mongo.db
            const id = request.params.id
            const { setReferenceList } = request.payload

            const catalogDetail = await db.collection('YingCatalogDetail').find({ 'yingCatalogId': id }).toArray()
            if(catalogDetail.length == 0) return reply(Boom.badRequest('Invalid YingCatalog Id.'))

            setReferenceList.forEach(async (setReference, index) => {
                await db.collection('YingCatalogDetail')
                .updateOne(
                    {
                        'yingCatalogId' : id, 
                        'setReference': setReference
                    }, 
                    {
                        $set: {
                            'id': index + 1
                        }
                    }
                )
            });

            reply.success()

        } catch (error) {
            reply(Boom.badImplementation('', error))
        }
    }
}