import Boom from 'boom'

exports.name = {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {
        try {
            const db = request.mongo.db
            const ObjectID = request.mongo.ObjectID
            const { name } = request.payload

            const existingCatalog = await db.collection('YingCatalogName')
            .find({
                'name': name,
                'owner': request.auth.credentials.id
            }).toArray()
            if(existingCatalog.length > 0) return reply(Boom.badRequest('Your required name is existing.'))
            
            await db.collection('YingCatalogName')
            .findOneAndUpdate(
                {
                    _id: new ObjectID(request.auth.credentials.id)
                },
                {
                    $set: {
                        'name': name,
                        'owner': request.auth.credentials.id,
                        'lastModified': new Date()
                    }
                },
                {
                    upsert: true,
                    returnOriginal: false
                }
            );
            reply.success()

        } catch (error) {
            reply(Boom.badImplementation('', error))
        }
    }
}

exports.id = {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {
        try {
            const db = request.mongo.db
            const ObjectID = request.mongo.ObjectID
            const id = request.params.id
            const { setDescription, setReference, suiteName, romanceNote, setImages, address, remark, items } = request.payload

            const existingCatalog = await db.collection('YingCatalogDetail')
            .find({
                'setReference': setReference
            }).toArray()
            if(existingCatalog.length > 0) return reply(Boom.badRequest('Your required Id is existing.'))

            const catalogDetail = await db.collection('YingCatalogDetail').find({ 'yingCatalogId': id }).toArray()
            
            await db.collection('YingCatalogDetail')
            .findOneAndUpdate(
                {
                    _id: new ObjectID()
                },
                {
                    $set: {
                        'id': catalogDetail.length + 1,
                        'yingCatalogId': id,
                        'setReference': setReference,
                        'setDescription': setDescription,
                        'suiteName': suiteName,
                        'romanceNote': romanceNote,
                        'setImages': setImages,
                        'address': address,
                        'remark': remark,
                        'items': items,
                        'lastModified': new Date()
                    }
                },
                {
                    upsert: true,
                    returnOriginal: false
                }
            );
            reply.success()

        } catch (error) {
            reply(Boom.badImplementation('', error))
        }
    }
}