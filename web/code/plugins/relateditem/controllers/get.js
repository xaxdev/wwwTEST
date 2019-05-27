'use strict';

const Boom = require('boom')
const { findAll, transform } = require('../lib')

exports.all = {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {
        try {
            const db = request.mongo.db
            const page = request.query.page
            const size = request.query.pageSize

            const { allRelatedItem, countAll, pageRelatedItem } = await findAll(db, page, size)
            
            return reply({relatedItem: pageRelatedItem, countAll, allRelatedItem, message:'', statusCode: 200});
        } catch (error) {
            return reply(Boom.badImplementation('', error))
        }
    }
}

exports.some = {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {
        try {
            const db = request.mongo.db
            const { page, pageSize, name, reference} = request.query
            const size = pageSize
            
            let data = await db.collection('RelatedItem').find({
                'name': {'$regex' : `.*${name}.*`},
                'items': {'$elemMatch': {'reference': {'$regex' : `.*${reference}.*`}}}
            }).toArray()

            const { relatedItem, countAll, allRelatedItem } = await transform(data, page, size)
            
            return reply({relatedItem, countAll, allRelatedItem, message:'', statusCode: 200});
            
        } catch (error) {
            return reply(Boom.badImplementation('', error))
        }
    }
}

exports.reference = {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {
        try {
            const db = request.mongo.db
            const page = request.query.page
            const size = request.query.pageSize
            const reference = request.params.reference
            
            let data = await db.collection('RelatedItem').find({
                'items': {'$elemMatch': {'reference': {'$regex' : `.*${reference}.*`}}}
            }).toArray()
            
            const { relatedItem, countAll, allRelatedItem } = await transform(data, page, size)
            
            return reply({relatedItem, countAll, allRelatedItem, message:'', statusCode: 200});
            
        } catch (error) {
            return reply(Boom.badImplementation('', error))
        }
    }
}

exports.id = {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {
        try {
            const db = request.mongo.db
            const ObjectID = request.mongo.ObjectID
            const id = request.params.id
            
            let data = await db.collection('RelatedItem').findOne({'_id' : new ObjectID(id)})
            
            if (!data) return reply(Boom.badRequest('Invalid _id.'))
            
            const { relatedItem, countAll } = await transform([data], 1, 5)
            
            return reply({relatedItem: relatedItem[0], countAll, message:'', statusCode: 200});
            
        } catch (error) {
            return reply(Boom.badImplementation('', error))
        }
    }
}