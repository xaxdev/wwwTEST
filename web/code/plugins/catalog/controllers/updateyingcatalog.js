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
            const { setDescription, setReference, suiteName, romanceNote, setImages, address, remark, items } = request.payload

            const findExist = await db.collection('YingCatalogDetail').find({ 'yingCatalogId' : id, 'setReference': setReference}).toArray()
            if (findExist.length == 0) return reply(Boom.badRequest('Invalid Ying CatalogId.'))


            await db.collection('YingCatalogDetail')
            .updateOne(
                {
                    'yingCatalogId' : id, 
                    'setReference': setReference
                }, 
                {
                    $set: {
                        'setDescription': setDescription != '' ? setDescription : findExist[0].setDescription,
                        'suiteName': suiteName != '' ? suiteName : findExist[0].suiteName,
                        'romanceNote': romanceNote != '' ? romanceNote : findExist[0].romanceNote,
                        'setImages': setImages != '' ? setImages : findExist[0].setImages,
                        'address': address != '' ? address : findExist[0].address,
                        'remark': remark != '' ? remark : findExist[0].remark,
                        'items': items.length != 0 ? items : findExist[0].items,
                    }
                }
            )

            reply.success()
        } catch (error) {
            reply(Boom.badImplementation('', error))
        }
    }
}