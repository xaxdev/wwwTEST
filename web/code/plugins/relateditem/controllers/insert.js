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
            const ObjectID = request.mongo.ObjectID
            const size = request.payload.pageSize
            const { name, items, page } = request.payload
            let checkItem = false

            // checking name in related item
            const existingRelatedItem = await db.collection('RelatedItem').find({'name': name}).toArray()
            if(existingRelatedItem.length > 0) return reply({relatedItem: [], countAll:0, message:'Your required name is existing.', statusCode: 400})

            const countRelatedItem = await db.collection('RelatedItem').find().count()

            const promises = items.map(async (item)=>{
                const existingItem = await db.collection('RelatedItem').find({items: {$elemMatch: {reference: item.reference}}}).toArray()
                if(existingItem.length > 0) checkItem = checkItem || true
            })

            await Promise.all(promises);
            if(checkItem) return reply({relatedItem: [], countAll:0, message:'Your required item is existing.', statusCode: 400})

            // insert into related item table
            await db.collection('RelatedItem')
            .findOneAndUpdate(
                {
                    _id: new ObjectID()
                },
                {
                    $set: {
                        'id': countRelatedItem + 1,
                        'name': name,
                        'items': items,
                        'lastModified': new Date()
                    }
                },
                {
                    upsert: true,
                    returnOriginal: false
                }
            )

            // Find all item

            const { allRelatedItem, countAll, pageRelatedItem } = await findAll(db, page, size)

            return reply({relatedItem: pageRelatedItem, countAll, allRelatedItem, message:'Added related item is success.', statusCode: 201});
        } catch (error) {
            reply(Boom.badImplementation('', error))
        }
    }
}