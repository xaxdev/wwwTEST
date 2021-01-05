import 'babel-polyfill'; // required for async
import { CronJob } from 'cron';
import moment from 'moment-timezone';
import sendgrid from 'sendgrid'
import config from '../sendgrid.json'
import * as migration from './lib/migration/';

const init = async _ => {
    try {
        console.log(`Start migrating data at: ${moment().tz('Asia/Bangkok').format('HH:mm:ss')}`);
        const index = `mol_${moment().format('YYYYMMDD_HHmm')}`;
        const name = 'mol';

        const index_solditems = `mol_solditems_${moment().format('YYYYMMDD_HHmm')}`;
        const name_solditems = 'mol_solditems';
        const index_images_other_mme_onhand = `mol_images_other_mme_onhand_${moment().format('YYYYMMDD_HHmm')}`;
        const name_images_other_mme_onhand = 'mol_images_other_mme_onhand';
        const index_images_other_mme_solditems = `mol_images_other_mme_solditems_${moment().format('YYYYMMDD_HHmm')}`;
        const name_images_other_mme_solditems = 'mol_images_other_mme_solditems';

        await migration.imagesOtherMmeSolditem(index_images_other_mme_solditems);
        await migration.alias(index_images_other_mme_solditems, name_images_other_mme_solditems);

        await migration.soldItems(index_solditems);
        await migration.alias(index_solditems, name_solditems);

        await migration.imagesOtherMmeOnhand(index_images_other_mme_onhand);
        await migration.alias(index_images_other_mme_onhand, name_images_other_mme_onhand);

        await migration.migrate(index);
        await migration.itemSets(index);
        await migration.alias(index, name);
        await migration.productHierarchy();
    } catch (err) {
        throw err;
    }
};

const notify = err => {
    const time = moment().tz('Asia/Bangkok').format()
    const subject = (!!err)? `Failed to migrate data to ES at ${time}` : `Succeeded in migrating data to ES at ${time}`
    const sg = sendgrid(config.key)
    const request = sg.emptyRequest()

    request.method = 'POST'
    request.path = '/v3/mail/send'
    request.body = {
        personalizations: [
            {
                to: [
                    { email: 'korakod.c@mouawad.com' }
                ],
                subject
            }
        ],
        from: {
            email: 'Korakod.C@Mouawad.com'
        },
        content: [
            {
                type: 'text/plain',
                value: (!!err)? err.message : subject
            }
        ]
    };

    sg
        .API(request)
        .then(response => {
            console.log(response.statusCode)
            console.log(response.body)
            console.log(response.headers)
        })
        .catch(err => {
            console.log(err);
        });
};

new CronJob({
  cronTime: '00 00 6 * * *',
  onTick: _ => {
    init()
        .then(_ => {
            const time = moment().tz('Asia/Bangkok').format()
            console.log(`Migration is done at: ${time}`)
        })
        .catch(err => {
            return err
        })
        .then(value => {
            notify(value)
        });
  },
  start: true,
  timeZone: 'Asia/Bangkok'
});
