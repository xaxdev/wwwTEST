export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        (async _ => {

            const db = request.server.plugins['hapi-mongodb'].db
            reply(await db.collection('History').find({ "userId": request.auth.credentials.id }).toArray())
        })();
    }
}
