import Boom from 'boom'
import Joi from 'joi'
import _  from 'lodash'

const shareduser = Joi.object().keys({
    email: Joi.string().required()
});

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

            try {
                const db = request.mongo.db
                const ObjectID = request.mongo.ObjectID
                const catalogId = request.payload.id
                const usersShare = request.payload.users
                const UsersDB = request.collections.user;

                const users = await getUserId(usersShare, UsersDB);

                // await usersShare.map(async (user) => {
                //
                //     let uid = await UsersDB
                //       .findOneByEmail(user.email)
                //       .then(async (u) => {
                //           console.log(u.id);
                //         if (!u) {
                //           return reply(Boom.badRequest('Failed to find any account with this email.'));
                //         }
                //
                //         if (!u.status) {
                //           return reply(Boom.badRequest('This user is not active.'));
                //         }
                //
                //         // users.push({'id':user.id});
                //         return u.id;
                //         // console.log('users 2-->',users);
                //
                //       })
                //       .done();
                //       console.log('uid-->',uid);
                // });
                console.log('users last-->',users);
                // const findUser = await users.find(user => { return user.email === owner.email })


                // const owner = await request.user.getUserById(request, request.auth.credentials.id)
                //
                // const sharedMe = await users.find(user => { return user.email === owner.email })
                // if (!!sharedMe) return reply(Boom.badRequest("Share yourself is denied."))
                //
                // const findShared = await db.collection('CatalogShared').findOne(
                //     {
                //         "catalogId": new ObjectID(catalogId),
                //         "owner": owner.id
                //     })
                //
                // if (findShared !== null) {
                //     const sharedUser = typeof(findShared.users) !== "undefined" ? findShared.users : []
                //     findShared.users = _.uniqBy(_.union(sharedUser, users), "id")
                // }
                // else {
                //     findShared.users = users
                // }
                //
                // const updatedShared = await db.collection('CatalogShared').updateOne(
                //     {
                //         "catalogId": new ObjectID(catalogId),
                //         "owner": owner.id
                //     },
                //     {
                //         "catalogId": new ObjectID(catalogId),
                //         "owner": owner.id,
                //         "users": findShared.users
                //     },
                //     {
                //         upsert: true
                //     }
                // )

                return reply.success()

            } catch (e) {

                return reply(Boom.badImplementation('', e))
            }
        })();
    }
}

const findByEmail = (email, UsersDB,ids) => new Promise((resolve, reject) => {
    console.log('email-->',email);
    ids.push(email)
    return resolve(ids);
});

const getUserId = (usersShare, UsersDB) => new Promise(async (resolve, reject) => {
    console.log('usersShare-->',usersShare);
    let ids= [];
    await usersShare.map(async (user) => {

        const idss = await findByEmail(user.email,UsersDB,ids);
        console.log('idss-->',idss);
        return idss;

    });
    console.log('users 1-->',ids);
    UsersDB.find()
            .where({email: ids})
            .exec(function (err, response) {
                console.log('response-->',response);
                let id = response.map((detail) => {
                    return detail.id;
                })
                console.log('id-->',id);
            });
    // return resolve(ids);
});
