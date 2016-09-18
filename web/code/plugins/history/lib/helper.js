const Boom = require('boom');
const Promise = require('bluebird');
const _ = require('lodash');

export default {
    save: (request, reply, item) => {

        return (async (request, reply, item) => {

            try {
                const db = request.server.plugins['hapi-mongodb'].db

                return await db.collection('History')
                .findOneAndUpdate({ "userId": request.auth.credentials.id, "itemId": item.id } , { $set: { "displayStatus": true, "lookUpDate": _.now() }}, { returnOriginal: false, upsert: true })
                .then((value, err) => {
                    if (err) return Promise.reject(err)
                    return Promise.resolve(item)
                })
            } catch (e) {

                return Boom.badImplementation('', e)
            }
        })(request, reply, item);
    },

    getUserById: (request, reply, userId) => {

        return (async (request, reply, userId) => {

            try {
                const Users = request.collections.user
                const Permissions = request.collections.permission

                return await Users
                .findOne(userId)
                .then(async (user) => {

                    if (!user) return Boom.badRequest('User doesn\'t not found.')

                    return await Permissions
                    .findOne({ "id": user.permission })
                    .populate('onhandLocation')
                    .populate('onhandWarehouse')
                    .then((permission) => {

                        if (!permission) user.permission = {}

                        user.permission = permission.toJSON()

                        return user
                    })
                })
            } catch (e) {

                return Boom.badImplementation('', e)
            }
        })(request, reply, userId);
    }
}
