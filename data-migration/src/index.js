import 'babel-polyfill'; // required for async
import { CronJob } from 'cron';
import moment from 'moment-timezone';

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

init()
    .then(_ => {
        console.log(`Migration is done at: ${moment().tz('Asia/Bangkok').format('HH:mm:ss')}`);
    })
    .catch(err => {
        console.log(err);
    });
