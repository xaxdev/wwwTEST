const Boom = require('boom');

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: (request, reply) => {

        console.log(JSON.stringify(request.auth, null, 4));

        try {
            (async _ => {

                var db = request.server.plugins['hapi-mongodb'].db;
                var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

                db.collection('User').findOne({  "_id" : new ObjectID('577ddaec73b1eb082aab4bfc') }, function(err, result) {

                    if (err) return reply(Boom.internal('Internal MongoDB error', err));

                    reply(result);
                });
            })();
        } catch (e) {

            reply(Boom.internal(e));
        }
    }
}
