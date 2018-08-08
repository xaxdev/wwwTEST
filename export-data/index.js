import amqp from 'amqplib'
import { Client as elasticsearch } from 'elasticsearch'
import xl from 'excel4node'
import moment from 'moment-timezone';
import sendgrid from 'sendgrid'
import sendgridConfig from './sendgrid.json'
import * as utils from './utils'

const fs = require('fs');
const Path = require('path');
const AdmZip = require('adm-zip');
const archiver = require('archiver');
const Confidence = require('confidence');
const Promise = require('bluebird');

(async _ => {
    let userEmail = '';
    let typeFile = '';

    try {
        const store = new Confidence.Store(require('./config'));
        const config = store.get('/', { env: process.env.NODE_ENV || 'development' });
        const q = config.rabbit.channel;
        const connection = await amqp.connect(config.rabbit.url);
        const channel = await connection.createChannel();
        let TotalQueue = await channel.assertQueue(q);
        console.log('Total Queue-->',TotalQueue.messageCount);

        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        channel.consume(q, async msg => {
            let queue = await channel.assertQueue(q);
            console.log('queue-->',queue.messageCount);
            // channel.ack(msg)
            if (msg !== null) {
                const obj = JSON.parse(msg.content.toString());
                let body = '';
                let parameter = {};
                userEmail = obj.userEmail;
                typeFile = obj.typeFile;
                if (typeFile == 'OnHand') {
                    body = utils.getBody(obj, 0, 100000);
                    parameter = {
                        ...{},
                        index: config.elasticsearch.index,
                        type: config.elasticsearch.typeItems,
                        body
                    };
                    utils.excelOnHand(obj, config, parameter, body, utils, userEmail, channel, msg);
                }else{
                    body = utils.getSoldItemBody(obj, 0, 100000);
                    parameter = {
                        ...{},
                        index: config.elasticsearch.indexSoldItems,
                        type: config.elasticsearch.typeSoldItems,
                        body
                    };
                    utils.excelSoldItem(obj, config, parameter, body, utils, userEmail, channel, msg);
                }
            }
        }, {noAck: false})
    } catch (err) {
        console.log(err)
        utils.notifyFile(err, userEmail, emailBody);
    }
})()
