'use strict';

const Boom = require('boom')
const { findAll } = require('../lib')

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {

        try {
            const db = request.mongo.db
            const size = request.payload.pageSize
            const ObjectID = request.mongo.ObjectID
            const { name, items, id, page } = request.payload
            let checkItem = false

            // Find related by id
            const findExist = await db.collection('RelatedItem').findOne({ '_id' : new ObjectID(id)})
            if (!findExist) return reply({relatedItem: [], countAll:0, message:'Invalid _id.', statusCode: 400})

            const promises = items.map(async (item)=>{
                const existingItem = await db.collection('RelatedItem').find({'items': {$elemMatch: {reference: item.reference}}, '_id' : {$ne :new ObjectID(id)}}).toArray()
                if(existingItem.length > 0) checkItem = checkItem || true
            })
            
            // Find item in other list
            await Promise.all(promises);
            
            if(checkItem) return reply({relatedItem: [], countAll:0, message:'Your required item is existing.', statusCode: 400})
            
            // Update related item by id
            await db.collection('RelatedItem').updateOne({ '_id' : new ObjectID(id) }, { $set: { 'name': name, 'items': items } })

            // Find all item

            const { allRelatedItem, countAll, pageRelatedItem } = await findAll(db, page, size)
            
            return reply({relatedItem: pageRelatedItem, countAll, allRelatedItem, message:'', statusCode: 205}); // Assign HTTP status code for updated to 205

        } catch (e) {

            reply(Boom.badImplementation('', e))
        }
    }
}