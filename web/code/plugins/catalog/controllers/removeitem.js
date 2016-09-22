const Boom = require('boom')

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const db = request.server.plugins['hapi-mongodb'].db
                const ObjectID = request.server.plugins['hapi-mongodb'].ObjectID
                let items = request.payload.items

                items.forEach(({id}) => {

                    db.collection('CatalogItem').deleteMany({ "catalogId": new ObjectID(request.payload.id), "itemId": id.toString() }, (err, result) => {
                        if (err) reply(Boom.badImplementation('', err))
                    })
                })
                reply({ "status": true })
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
