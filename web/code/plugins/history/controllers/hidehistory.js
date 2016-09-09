const Boom = require('boom')

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async _ => {

            try {
                let items = request.payload.data
                const db = request.server.plugins['hapi-mongodb'].db

                items.forEach(({id}) => {

                    db.collection('History').updateOne({ "userId": request.auth.credentials.id, "id": id.trim() }, { $set: { "displayStatus": false } }, (err, result) => {
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
