const Boom = require('boom')
const { transform } = require('../lib')

const amqp = require('amqplib/callback_api');

export default {
    auth: {
        strategy: 'authentication'
    },
    handler: async (request, reply) => {
        const amqpHost = request.server.plugins.amqp.host;        
        const amqpChannel = request.server.plugins.amqp.channelRelatedExcel;

        try {
            const db = request.mongo.db
            const { page, pageSize, name, reference} = request.query
            const size = pageSize
            
            let data = await db.collection('RelatedItem').find({
                'name': {'$regex' : `.*${name}.*`},
                'items': {'$elemMatch': {'reference': {'$regex' : `.*${reference}.*`}}}
            }).toArray()

            const { relatedItem, countAll, allRelatedItem } = await transform(data, page, size)

            amqp.connect(amqpHost, function(err, conn) {
                conn.createChannel(function(err, ch) {
                    const q = amqpChannel;

                    ch.assertQueue(q);
                    // Note: on Node 6 Buffer.from(msg) should be used
                    ch.sendToQueue(q, new Buffer(JSON.stringify(request.payload, null, 2)), {persistent: true});
                    // console.log(' [x] Sent "Parameter!"');
                });
            });

            // return reply({relatedItem, countAll, allRelatedItem, message:'', statusCode: 200});
            return reply.success()
        } catch (err) {
            elastic.close();
            return reply(Boom.badImplementation(err));
        }
    }
};
