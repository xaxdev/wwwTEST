import Boom from 'boom'
import Joi from 'joi'
import _  from 'lodash'
import moment from 'moment-timezone'
import sendgrid from 'sendgrid'
import sendgridConfig from '../sendgrid.json'
import nodeoutlook  from 'nodejs-nodemailer-outlook'

const shareduser = Joi.object().keys({
    email: Joi.string().required()
});

let userEmail = [];

module.exports = {
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
                const subject = (!!err)? `Failed share save search  ${time}` : `Succeeded share save search ${time}`
            
                nodeoutlook.sendEmail({
                    auth: {
                        user: 'noreply@mouawad.com',
                        pass: 'Y63jeYVvF!'
                    },
                    from: 'noreply@mouawad.com',
                    to: userEmail,
                    subject: subject,
                    html: emailBody,
                    onError: (e) => {
                        console.log(e)
                        return reject(e)
                    },
                    onSuccess: (i) => {
                        console.log(i)
                        return resolve()
                    }
                });
            });

            // const notify = err => new Promise((resolve, reject) => {                
            //     const time = moment().tz('Asia/Bangkok').format()
            //     const subject = (!!err)? `Failed share save search  ${time}` : `Succeeded share save search ${time}`
            //     const sg = sendgrid(sendgridConfig.key)
            //     const request = sg.emptyRequest()

            //     request.method = 'POST'
            //     request.path = '/v3/mail/send'
            //     request.body = {
            //         personalizations: [
            //             {
            //                 to: userEmail,
            //                 subject
            //             }
            //         ],
            //         from: {
            //             email: 'Korakod.C@Mouawad.com',
            //             name: 'Mouawad Admin'
            //         },
            //         content: [
            //             {
            //                 type: 'text/plain',
            //                 value: (!!err)? err.message : emailBody
            //             }
            //         ]
            //     };

            //     sg
            //         .API(request)
            //         .then(response => {
            //             console.log(response.statusCode)
            //             console.log(response.body)
            //             console.log(response.headers)
            //             return resolve()
            //         })
            //         .catch(err => {
            //             console.log(err);
            //         });
            // });

            try {
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID
                const searchId = request.payload.id
                const usersShare = request.payload.users;
                const UsersDB = request.collections.user;

                const users = await getUserId(usersShare, UsersDB);
                const owner = await request.user.getUserById(request, request.auth.credentials.id);
                const diffFound = _.differenceBy(usersShare, users, 'email');
                if (diffFound.length != 0) return reply(Boom.badRequest(`Cannot found the email in system ${diffFound.map((e)=>{return e.email})}`));


                const sharedMe = await users.find(user => { return user.id === owner.id })
                if (!!sharedMe) return reply(Boom.badRequest('Share yourself is denied.'))

                const findShared = await db.collection('SearchCriteria').findOne(
                {
                    '_id': new ObjectID(searchId),
                    'owner': owner.id
                })

                if (findShared !== null) {
                    const sharedUser = typeof(findShared.users) !== 'undefined' ? findShared.users : []
                    findShared.users = _.uniqBy(_.union(sharedUser, users), 'id')
                }
                else {
                    findShared.users = users
                }

                const updatedShared = await db.collection('SearchCriteria').updateOne(
                    {
                        '_id': new ObjectID(searchId)
                    },
                    {
                        $set: {
                            'users': findShared.users
                        }
                    },
                    {
                        upsert: false
                    }
                )

                emailBody = '';
                emailBody = `${owner.firstName} ${owner.lastName} shared a save search with you. 
                            Save search name (${findShared.name})`;
                await notify('');

                return reply({error:'',message:'Shared save search success.',statusCode:200});
            } catch (e) {
                console.log(e)
                notify(e);
                return reply(Boom.badImplementation('', e))
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
            let obj = { 'id': detail.id, 'email': detail.email };
            return obj;
        })
        return resolve(id);
    });
});
