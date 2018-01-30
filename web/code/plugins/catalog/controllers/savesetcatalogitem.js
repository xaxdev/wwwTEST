import Boom from 'boom'
import _  from 'lodash'

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {
        (async () => {
            try {
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID
                const setCatalogPayload = request.payload
                const setCatalogPayloadId = request.payload.id
                const helper = request.helper
                const setitems = request.payload.items
                const user = await request.user.getUserById(request, request.auth.credentials.id)

                if (!!!setCatalogPayloadId) {
                    const existingSetCatalog = await db.collection('SetCatalogName').find({ 'setCatalog': request.payload.setcatalog, 'userId': request.auth.credentials.id }).toArray()

                    if(existingSetCatalog.length > 0) return reply(Boom.badRequest('Your required name is existing.'))
                }

                const setCatalogCollection = await db.collection('SetCatalogName').findOneAndUpdate(
                    {
                        _id: new ObjectID(setCatalogPayloadId)
                    },
                    {
                        $set: {
                            'setCatalog': request.payload.setcatalog,
                            'userId': request.auth.credentials.id,
                            'lastModified': new Date()
                        }
                    },
                    {
                        upsert: true,
                        returnOriginal: false
                    })
                const setcatalogColId = setCatalogCollection.lastErrorObject.updatedExisting ? setCatalogCollection.value._id : setCatalogCollection.lastErrorObject.upserted

                setitems.forEach(async (setitem) => {
                    await db.collection('SetCatalogItem').findOneAndUpdate(
                        {
                            'setCatalogId': new ObjectID(setcatalogColId),
                            'id': null,
                            'reference': setitem.reference
                        },
                        {
                            $set: {
                                'description': setitem.description,
                                'lastModified': new Date(),
                                'priceInUSD': parseInt(setitem.priceUSD.replace(/,/g,'')),
                                'setReference': setitem.reference
                            }
                        },
                        {
                            upsert: true,
                            returnOriginal: false
                        })
                })

                reply.success()

            } catch (e) {
                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
