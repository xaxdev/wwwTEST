import Boom from 'boom'
const { findAll, findAllOwner, transform } = require('../utils')
import objectToArray from '../utils/objectToArray'
import pagination from '../utils/pagination'

exports.name = {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {
        try {
            const db = request.mongo.db
            const page = request.query.page
            const size = request.query.pageSize
            const owner = request.auth.credentials.id

            const { allRelatedItem, countAll, pageRelatedItem } = await findAll(db, page, size, owner)

            return reply({data: pageRelatedItem, countAll, allRelatedItem, message:'', statusCode: 200});

        } catch (error) {
            reply(Boom.badImplementation('', error))
        }
    }
}

exports.nameall = {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {
        try {
            const db = request.mongo.db
            const page = request.query.page
            const size = request.query.pageSize
            const owner = request.auth.credentials.id

            const { allRelatedItem, countAll } = await findAllOwner(db, page, size, owner)

            return reply({data: allRelatedItem, countAll, allRelatedItem, message:'', statusCode: 200});

        } catch (error) {
            reply(Boom.badImplementation('', error))
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
            const page = request.query.page
            const size = request.query.pageSize
            const id = request.params.id
            
            let data = await db.collection('YingCatalogDetail').find({'yingCatalogId' : id}).sort({ id: 1 }).toArray()
            
            if (data.length == 0) return reply(Boom.badRequest('Invalid Ying CatalogId.'))
            
            const { yingCatalogDetail, countAll } = await transform(data, page, size)

            return reply({yingCatalogDetail: yingCatalogDetail[0], countAll, message:'', statusCode: 200});
            
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
            const { page, pageSize, name} = request.query
            const size = pageSize
            const owner = request.auth.credentials.id
            let allRelatedItem = []
            let pageRelatedItem = []
            
            let data = await db.collection('YingCatalogName').find({
                'name': {'$regex' : `.*${name}.*`},
                owner
            }).toArray()

            const countAll = data.length

            if (data.length > 0) {
                allRelatedItem = await objectToArray(data)
            }

            pageRelatedItem = pagination(allRelatedItem, page, size)
            await pageRelatedItem.map(async(col,index)=>{
                let status = 'Owner'
                col.status = status
            })

            allRelatedItem = allRelatedItem.map((item) => {return {'id':item._id}})

            return reply({data: pageRelatedItem, countAll, allRelatedItem, message:'', statusCode: 200});
            
        } catch (error) {
            return reply(Boom.badImplementation('', error))
        }
    }
}