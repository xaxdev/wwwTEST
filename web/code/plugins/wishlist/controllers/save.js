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
                const wlistPayload = request.payload
                const wlistPayloadId = request.payload.id
                const wlistPayloadItems = request.payload.items
                const helper = request.helper
                const items = request.payload.items
                const es = await client.search(request.helper.item.parameters(items))
                const inventory = await request.helper.item.inventory(items, es)
                const user = await request.user.getUserById(request, request.auth.credentials.id)
                const response = await request.helper.item.authorization(user, inventory)
                const refuseItem = response.filter((item) => { return !item.availability || !item.authorization })

                if(refuseItem.length > 0) return reply.invalidItems(refuseItem)

                const wlistCollection = await db.collection('WishlistName').findOneAndUpdate(
                    {
                        _id: new ObjectID(wlistPayloadId)
                    },
                    {
                        $set: {
                            "wishlist": request.payload.wishlist,
                            "userId": request.auth.credentials.id,
                            "lastModified": new Date()
                        }
                    },
                    {
                        upsert: true,
                        returnOriginal: false
                    })
                const wlistColId = wlistCollection.lastErrorObject.updatedExisting ? wlistCollection.value._id : wlistCollection.lastErrorObject.upserted

                response.forEach(async (item) => {

                    await db.collection('WishlistItem').findOneAndUpdate(
                        {
                            "wishlistId": new ObjectID(wlistColId),
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
