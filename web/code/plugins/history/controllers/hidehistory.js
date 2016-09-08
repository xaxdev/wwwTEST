export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async _ => {

            const db = request.server.plugins['hapi-mongodb'].db
            reply(await db.collection('History').updateOne({ "userId": request.auth.credentials.id, "id": request.payload.id }, { $set: { "displayStatus": false } }))
        })();
    }
}
