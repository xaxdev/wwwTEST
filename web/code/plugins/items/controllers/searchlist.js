import Boom from 'boom'
import Joi from 'joi'
import _  from 'lodash'

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const db = request.mongo.db

                const ownList = await db.collection('SearchCriteria').find({'owner': request.auth.credentials.id},{'name': 1}).sort({ 'name': 1 }).toArray()
                const markOwnList = ownList.map((item) => { return { ...item, shared: false } })

                const sharedList = await db.collection('SearchCriteria').find({'users.id': { $in: [request.auth.credentials.id] }},{'name': 1}).sort({ 'name': 1 }).toArray()
                const markSharedList = sharedList.map((item) => { return { ...item, shared: true } })

                const ownSalesList = await db.collection('SalesSearchCriteria').find({'owner': request.auth.credentials.id},{'name': 1}).sort({ 'name': 1 }).toArray()
                const markOwnSalesList = ownSalesList.map((item) => { return { ...item, shared: false } })

                const sharedSalesList = await db.collection('SalesSearchCriteria').find({'users.id': { $in: [request.auth.credentials.id] }},{'name': 1}).sort({ 'name': 1 }).toArray()
                const markSharedSalesList = sharedSalesList.map((item) => { return { ...item, shared: true } })

                const data = {
                    onhand: _.union(markOwnList, markSharedList),
                    sales: _.union(markOwnSalesList, markSharedSalesList)
                }
                return reply(data)
            } catch (e) {

                return reply(Boom.badImplementation('', e))
            }
        })();
    }
}
