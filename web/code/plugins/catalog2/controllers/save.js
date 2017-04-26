import Boom from 'boom'
import Elasticsearch from 'elasticsearch'
import _  from 'lodash'

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async () => {

            const client = new Elasticsearch.Client({
                            host: request.elasticsearch.host,
                            keepAlive: false
                        })
            try {
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID
                const catalogPayload = request.payload
                const catalogPayloadId = request.payload.id

                const helper = request.helper
                const items = request.payload.items
                const es = await client.search(request.helper.item.parameters(items))
                const inventory = await request.helper.item.inventory(items, es)
                const user = await request.user.getUserById(request, request.auth.credentials.id)
                const response = await request.helper.item.authorization(user, inventory)
                const refuseItem = response.filter((item) => { return !item.availability || !item.authorization })

                if(refuseItem.length > 0) return reply.invalidItems(refuseItem)

                if (!!!catalogPayloadId) {
                    const existingCatalog = await db.collection('CatalogName').find({ "catalog": request.payload.catalog, "userId": request.auth.credentials.id }).toArray()

                    if(existingCatalog.length > 0) return reply(Boom.badRequest("Your required name is existing."))
                }

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

                response.forEach(async (item) => {

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
            } finally {
                client && client.close()
            }
        })();
    }
}
