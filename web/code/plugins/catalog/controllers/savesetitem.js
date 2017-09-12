import Boom from 'boom'
// import Elasticsearch from 'elasticsearch'
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
                const catalogPayload = request.payload
                const catalogPayloadId = request.payload.id
                const helper = request.helper
                const setitems = request.payload.items
                const user = await request.user.getUserById(request, request.auth.credentials.id)

                if (!!!catalogPayloadId) {
                    const existingCatalog = await db.collection('CatalogName').find({ 'catalog': request.payload.catalog, 'userId': request.auth.credentials.id }).toArray()

                    if(existingCatalog.length > 0) return reply(Boom.badRequest('Your required name is existing.'))
                }

                const catalogCollection = await db.collection('CatalogName').findOneAndUpdate(
                    {
                        _id: new ObjectID(catalogPayloadId)
                    },
                    {
                        $set: {
                            'catalog': request.payload.catalog,
                            'userId': request.auth.credentials.id,
                            'lastModified': new Date()
                        }
                    },
                    {
                        upsert: true,
                        returnOriginal: false
                    })
                const catalogColId = catalogCollection.lastErrorObject.updatedExisting ? catalogCollection.value._id : catalogCollection.lastErrorObject.upserted

                setitems.forEach(async (setitem) => {
                    await db.collection('CatalogItem').findOneAndUpdate(
                        {
                            'catalogId': new ObjectID(catalogColId),
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
