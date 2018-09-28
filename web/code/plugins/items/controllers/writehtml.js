import moment from 'moment-timezone';
import * as file from '../utils/file'

const fs = require('fs');
const Path = require('path');
const Boom = require('boom');
const amqp = require('amqplib/callback_api');

module.exports = {
    auth: {
        strategy: 'authentication'
    },
    payload: {
        parse: true,
        maxBytes: 94371840
    },
    handler: (request, reply) => {
        const channel = request.payload.channel;
        const amqpHost = request.server.plugins.amqp.host;
        const amqpChannel = channel == 'pdf'? request.server.plugins.amqp.channelPdf: request.server.plugins.amqp.channelWord;

        try {
            (async _ => {
                console.log('writing...');
                let temp = request.payload.temp;
                let userName =  request.payload.userName;
                console.log('userName-->',userName);

                const destination = channel == 'pdf'
                    ? Path.resolve(__dirname, '../../../../../pdf/import_html')
                    : Path.resolve(__dirname, '../../../../../word-export/import_html')

                await file.write(`${destination}/${userName}.html`, temp);
                console.log('writing done!');
                amqp.connect(amqpHost, function(err, conn) {
                    conn.createChannel(function(err, ch) {
                        const q = amqpChannel;

                        ch.assertQueue(q);
                        // Note: on Node 6 Buffer.from(msg) should be used
                        let params = {
                            'userName': userName,
                            'userEmail': request.payload.userEmail,
                            'ROOT_URL': request.payload.ROOT_URL
                        };
                        ch.sendToQueue(q, new Buffer(JSON.stringify(params, null, 2)), {persistent: true});
                        // console.log(' [x] Sent "Parameter!"');
                    });
                });
                const sendData = { 'write': 'done' };
                return reply(sendData);
            })()

        } catch (err) {
            console.log('error-->',error)
            return reply(Boom.badImplementation(err));
        }
    }
};
