const Boom = require('boom');
const Promise = require('bluebird');

export default {
    getUserById: (request, userId) => {

        return (async (request, userId) => {

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
        })(request, userId);
    }
}
