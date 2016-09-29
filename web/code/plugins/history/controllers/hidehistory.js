import Boom from 'boom'
import _ from 'lodash'

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async () => {

            try {
                const db = request.mongo.db
                const dataPayload = request.payload.data

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
