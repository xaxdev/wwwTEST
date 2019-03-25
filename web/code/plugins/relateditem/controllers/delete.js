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
            const { status, page } = request.payload
            const id = request.params.id

            // Find related by id
            const findExist = await db.collection('RelatedItem').findOne({ '_id' : new ObjectID(id)})
            if (!findExist) return reply({relatedItem: [], countAll:0, message:'Invalid _id.', statusCode: 400})
            
            // Update related item by id
            await db.collection('RelatedItem').updateOne({ '_id' : new ObjectID(id) }, { $set: { 'status': status } })

            // // Find all item
            const { allRelatedItem, countAll, pageRelatedItem } = await findAll(db, page, size)
            
            return reply({relatedItem: pageRelatedItem, countAll, allRelatedItem, message:'', statusCode: 206}); // Assign HTTP status code for deleted to 206

        } catch (e) {

            reply(Boom.badImplementation('', e))
        }
    }
}