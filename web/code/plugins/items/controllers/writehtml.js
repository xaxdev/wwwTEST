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
  handler: (request, reply) => {
      const amqpHost = request.server.plugins.amqp.host;
      const amqpChannel = request.server.plugins.amqp.channelPdf;

      try {
          (async _ => {
              let startDate = new Date();
              let exportDate = moment(startDate,'MM-DD-YYYY');
              exportDate = exportDate.format('YYYYMMDD_HHmmss');
              console.log('writing html...');
              let temp = request.payload.temp;
              let userName =  `${request.payload.userName}_${exportDate}`;
              console.log('userName-->',userName);

              const destination = Path.resolve(__dirname, '../../../../../pdf/import_html')

              await file.write(`${destination}/${userName}.html`, temp);
              console.log('writing done!');
              amqp.connect(amqpHost, function(err, conn) {
                conn.createChannel(function(err, ch) {
                  var q = amqpChannel;

                  ch.assertQueue(q);
                  // Note: on Node 6 Buffer.from(msg) should be used
                //   console.log('request.payload.ROOT_URL-->',request.payload.ROOT_URL);
                  let params = {
                                'userName': userName,
                                'userEmail': request.payload.userEmail,
                                'ROOT_URL': request.payload.ROOT_URL
                                };
                  ch.sendToQueue(q, new Buffer(JSON.stringify(params, null, 2)), {persistent: true});
                  // console.log(' [x] Sent "Parameter!"');

                });
              });
              const sendData = {
                      'write': 'done'
                      };
              return reply(sendData);
          })()

      } catch (err) {
          console.log('error-->',error)
          return reply(Boom.badImplementation(err));
      }

    }
};
