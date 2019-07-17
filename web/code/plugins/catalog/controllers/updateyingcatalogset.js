import Boom from 'boom'
import Elasticsearch from 'elasticsearch'
let countId = 0

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {
        try {
            const db = request.mongo.db
            const ObjectID = request.mongo.ObjectID
            const { id } = request.params
            const { items } = request.payload

            const findExist = await db.collection('YingCatalogName').find({ '_id': new ObjectID(id)}).toArray()
            if (findExist.length == 0) return reply(Boom.badRequest('Invalid Ying CatalogId.'))

            const findOld = await db.collection('YingCatalogDetail').find({ 'yingCatalogId' : id}).toArray()
            countId = findOld.length
            
            const itemDetails = await Promise.all(items.map(getDetail(request)))  
            
            await Promise.all(itemDetails.map(addSetDetails(db)(id)(ObjectID)))

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
    const es = await client.search(request.helper.setitem.parameters([item]))
    const user = await request.user.getUserById(request, request.auth.credentials.id)
    const inventory = await request.helper.setitem.inventory([item], es)
    const [newItem] = await request.helper.setitem.authorization(user, inventory)

    return newItem
}

const addSetDetails = (db) => (id) => (ObjectID) => async (set)=>{
    const { reference, description, setName, setRomanceNote, image, items } = set
    const originalFileName = image.length != 0 ? image[0].originalFileName: ''
    
    countId = countId + 1;
    const newItems = items.map(mapPriceInUSD)
    await db.collection('YingCatalogDetail')
    .findOneAndUpdate(
        {
            _id: new ObjectID()
        },
        {
            $set: {
                'id': countId,
                'yingCatalogId': id,
                'setReference': reference,
                'setDescription': description,
                'suiteName': setName,
                'romanceNote': setRomanceNote,
                'setImages': originalFileName,
                'items': newItems,
                'lastModified': new Date()
            }
        },
        {
            upsert: true,
            returnOriginal: false
        }
    );
}

const mapPriceInUSD = (item) =>{
    return {
        ...item, 
        priceInUSD: item.price.USD, 
        updatedCostInUSD: item.updatedCost.USD, 
        actualCostInUSD: item.actualCost.USD
    }
}