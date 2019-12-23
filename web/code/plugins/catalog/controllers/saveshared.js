import Boom from 'boom'
import Joi from 'joi'
import _  from 'lodash'
import moment from 'moment-timezone';
import sendgrid from 'sendgrid';
import sendgridConfig from '../sendgrid.json';

const shareduser = Joi.object().keys({
    email: Joi.string().required().trim()
});

let userEmail = [];

export default {
    auth: {
        strategy: 'authentication'
    },
    validate: {
        payload: {
            id: Joi.string().required(),
            users: Joi.array().items(shareduser)
        }
    },
    handler: (request, reply) => {

        (async () => {

            let emailBody = '';
            userEmail = [];

            const notify = err => new Promise((resolve, reject) => {                
                const time = moment().tz('Asia/Bangkok').format()
                const subject = (!!err)? `Failed share data catalog  ${time}` : `Succeeded share data catalog ${time}`
                const sg = sendgrid(sendgridConfig.key)
                const request = sg.emptyRequest()

                request.method = 'POST'
                request.path = '/v3/mail/send'
                request.body = {
                    personalizations: [
                        {
                            to: userEmail,
                            subject
                        }
                    ],
                    from: {
                        email: 'dev@itorama.com',
                        name: 'Mouawad Admin'
                    },
                    content: [
                        {
                            type: 'text/plain',
                            value: (!!err)? err.message : emailBody
                        }
                    ]
                };

                sg
                    .API(request)
                    .then(response => {
                        console.log(response.statusCode)
                        console.log(response.body)
                        console.log(response.headers)
                        return resolve()
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });

            try {
                const db = request.mongo.db;
                const ObjectID = request.mongo.ObjectID;
                const catalogId = request.payload.id;
                const usersShare = request.payload.users;
                const UsersDB = request.collections.user;

                const users = await getUserId(usersShare, UsersDB);
                const owner = await request.user.getUserById(request, request.auth.credentials.id);
                const diffFound = _.differenceBy(usersShare, users, 'email');
                if (diffFound.length != 0) return reply(Boom.badRequest(`Cannot found the email in system ${diffFound.map((e)=>{return e.email})}`));

                const sharedMe = await users.find(user => { return user.id === owner.id });
                console.log({sharedMe});
                
                if (!!sharedMe) return reply(Boom.badRequest('Unable to share catalog to yourself.'));

                const findShared = await db.collection('CatalogShared').findOne(
                {
                    'catalogId': new ObjectID(catalogId),
                    'owner': owner.id
                });
                let catalogName = await db.collection('CatalogName').findOne({ '_id' : new ObjectID(catalogId) })
                
                let consolidateShareUser = null;
                if (findShared !== null) {
                    const sharedUser = typeof(findShared.users) !== 'undefined' ? findShared.users : [];
                    consolidateShareUser = _.uniqBy(_.union(sharedUser, users), 'id');
                }
                else {
                    consolidateShareUser = users;
                }

                const updatedShared = await db.collection('CatalogShared').updateOne(
                    {
                        'catalogId': new ObjectID(catalogId),
                        'owner': owner.id
                    },
                    {
                        'catalogId': new ObjectID(catalogId),
                        'owner': owner.id,
                        'users': consolidateShareUser.map((user) => { return { 'id': user.id } })
                    },
                    {
                        upsert: true
                    }
                );

                emailBody = '';
                emailBody = `${owner.firstName} ${owner.lastName} shared with you "${catalogName.catalog}"`;
                await notify('');

                return reply({error:'',message:'Share catalog success.',statusCode:200});
            } catch (e) {
                console.log(e)
                notify(e);
                return reply(Boom.badImplementation('', e));
            }
        })();
    }
}

const findByEmail = (email, UsersDB, ids) => new Promise((resolve, reject) => {
    ids.push(email)
    userEmail.push({email})
    return resolve(ids);
});

const getUserId = (usersShare, UsersDB) => new Promise(async (resolve, reject) => {
    let ids= [];
    await usersShare.map(async (user) => {
        const idss = await findByEmail(user.email,UsersDB,ids);
        return idss;
    });
    UsersDB.find()
    .where({
        email: ids,
        status: true
    })
    .exec(function (err, response) {
        let id = response.map((detail) => {
            let obj = { 'id': detail.id, 'email': detail.email,'firstName': detail.firstName, 'lastName': detail.lastName };
            return obj;
        })
        return resolve(id);
    });
});
