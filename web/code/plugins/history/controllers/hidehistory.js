const Boom = require('boom')
const _ = require('lodash')

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async () => {

            try {
                let dataPayload = request.payload.data
                const db = request.server.plugins['hapi-mongodb'].db

                dataPayload.forEach(({id}) => {

                    db.collection('History').updateOne({ "userId": request.auth.credentials.id, "itemId": id.trim() }, { $set: { "displayStatus": false } }, (err, result) => {
                        if (err) reply(Boom.badImplementation('', err))
                    })
                })

                reply({ status: true })
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
