import Boom from 'boom'
import Joi from 'joi'
import _  from 'lodash'

const shareduser = Joi.object().keys({
    email: Joi.string().required().trim()
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
                if (!!sharedMe) return reply(Boom.badRequest('Unable to share catalog to yourself.'));

                const findShared = await db.collection('CatalogShared').findOne(
                    {
                        'catalogId': new ObjectID(catalogId),
                        'owner': owner.id
                    });

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

                return reply({error:'',message:'Share catalog success.',statusCode:200});
            } catch (e) {

                return reply(Boom.badImplementation('', e));
            }
        })();
    }
}

const findByEmail = (email, UsersDB, ids) => new Promise((resolve, reject) => {
    ids.push(email)
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
