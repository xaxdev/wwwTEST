import Boom from 'boom'
import Elasticsearch from 'elasticsearch'

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {
        try {
            const db = request.mongo.db
            const ObjectID = request.mongo.ObjectID
            const { id } = request.params
            const { setReference, items } = request.payload

            const findExist = await db.collection('YingCatalogDetail').find({ 'yingCatalogId' : id, '_id': new ObjectID(setReference)}).toArray()
            if (findExist.length == 0) return reply(Boom.badRequest('Invalid Ying CatalogId.'))

            const itemDetails = await Promise.all(items.map(getDetail(request)))

            const merge = (old, news, name) => old.filter( itemOld => ! news.find ( itemNew => itemOld[name] === itemNew[name]) ).concat(news);

            // Merge two array and de-duplicate items
            const newItems = merge(findExist[0].items, itemDetails, 'reference')

            await db.collection('YingCatalogDetail')
            .updateOne(
                {
                    'yingCatalogId' : id, 
                    '_id': new ObjectID(setReference)
                }, 
                {
                    $set: {
                        'items': newItems
                    }
                }
            )

            reply.success()
        } catch (error) {
            reply(Boom.badImplementation('', error))
        }
    }
}

const getDetail = (request) => async (item)=>{
    const client = new Elasticsearch.Client({
        host: request.elasticsearch.host,
        keepAlive: false
    })
    const { reference } = item;    
    const items = [reference]
    const es = await client.search(request.helper.item.parametersReference(items))
    const user = await request.user.getUserById(request, request.auth.credentials.id)
    const inventory = await request.helper.item.inventoryReference(items, es)
    const [newItem] = await request.helper.item.authorization(user, inventory)
    
    return newItem
}