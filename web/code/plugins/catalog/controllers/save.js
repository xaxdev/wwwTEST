import Boom from 'boom'
import Elasticsearch from 'elasticsearch'
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
                const catalogPayloadItems = request.payload.items
                const helper = request.helper
                const user = await request.user.getUserById(request, request.auth.credentials.id)
                const client = new Elasticsearch.Client({
                                host: request.elasticsearch.host,
                                keepAlive: false
                            })
                const esItemData = await request.helper.item.parse(request.payload.items, user, client)
                const refuseItem = esItemData.filter((item) => { return !item.availability || !item.authorization })

                if(refuseItem.length > 0) return reply.invalidItems(refuseItem)

                const catalogCollection = await db.collection('CatalogName').findOneAndUpdate(
                    {
                        _id: new ObjectID(catalogPayloadId)
                    },
                    {
                        $set: {
                            "catalog": request.payload.catalog,
                            "userId": request.auth.credentials.id,
                            "lastModified": new Date()
                        }
                    },
                    {
                        upsert: true,
                        returnOriginal: false
                    })
                const catalogColId = catalogCollection.lastErrorObject.updatedExisting ? catalogCollection.value._id : catalogCollection.lastErrorObject.upserted

                esItemData.forEach(async (item) => {

                    await db.collection('CatalogItem').findOneAndUpdate(
                        {
                            "catalogId": new ObjectID(catalogColId),
                            "id": item.id.toString()
                        },
                        {
                            $set: {
                                "reference": item.reference,
                                "description": item.description,
                                "lastModified": new Date()
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
