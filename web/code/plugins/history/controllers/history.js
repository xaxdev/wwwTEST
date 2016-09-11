const Boom = require('boom')
const _ = require('lodash')

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async () => {

            const display = request.params.display || "ACTIVE"
            const page = request.params.page || 1
            const size = 8
            let fCondition = { "userId": request.auth.credentials.id }

            if (display != undefined) {
                switch(display.toUpperCase()){
                    case "ALL":
                        fCondition = fCondition
                        break;
                    case "ACTIVE":
                        fCondition = _.assign({ "displayStatus": true }, fCondition)
                        break;
                    case "DEACTIVE":
                        fCondition = _.assign({ "displayStatus": false }, fCondition)
                        break;
                    default:
                        fCondition = _.assign({ "displayStatus": true }, fCondition)
                }
            }

            try {
                const db = request.server.plugins['hapi-mongodb'].db
                let data = await
                    db.collection('History')
                    .find(fCondition)
                    .sort({ "lookUpDate": -1 })
                    .toArray()

                reply({
                    "status": true,
                    "page": parseInt(page),
                    "total_items": data.length,
                    "total_pages": Math.ceil(data.length / size),
                    "items": data.slice((page - 1) * size, page * size)
                })
            } catch (e) {

                reply(Boom.badImplementation('', e))
            }
        })();
    }
}
