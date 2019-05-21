'use strict';

const Boom = require('boom');
const Joi = require('joi');
const Promise = require('bluebird');

module.exports = {
    // auth: {
    //   strategy: 'authentication',
    //   scope: ['admin']
    // },
    validate: {
        payload: {
            firstName: Joi.string().required(),
            lastName: Joi.string(),
            email: Joi.string().email().required(),
            username: Joi.string().required(),
            password: Joi.string().required(),
            currency: Joi.string().required(),
            role: Joi.string().required(),
            status: Joi.boolean().required(),
            company: Joi.string().required(),
            location: Joi.string().required(),
            warehouse: Joi.string().allow(''),
            permission: Joi.object({
                productGroup: Joi.number().integer(),
                productGroupSales: Joi.number().integer(),
                onhandLocation: Joi.object({
                    type: Joi.string(),
                    places: Joi.array().items(Joi.string())
                }).allow(null),
                onhandWarehouse: Joi.object({
                    type: Joi.string(),
                    places: Joi.array().items(Joi.string())
                }).allow(null),
                salesLocation: Joi.object({
                    type: Joi.string(),
                    places: Joi.array().items(Joi.string())
                }).allow(null),
                salesWarehouse: Joi.object({
                    type: Joi.string(),
                    places: Joi.array().items(Joi.string())
                }).allow(null),
                salesChannel: Joi.object({
                    type: Joi.string(),
                    places: Joi.array().items(Joi.string())
                }).allow(null),
                price: Joi.string(),
                priceSales: Joi.number().integer(),
                notUseHierarchy: Joi.string(),
                category: Joi.number().integer(),
                salesCategory: Joi.number().integer(),
                userType: Joi.string(),
                bomOnhand: Joi.boolean(),
                bomSales: Joi.boolean(),
                relatedItemOnhand: Joi.boolean()
            }).required(),
            webOnly: Joi.boolean(),
            movement: Joi.boolean()
        }
    },
    pre: [{ method: (request, reply) => {

        const Users = request.collections.user;

        Promise
        .all([Users.findOneByUsername(request.payload.username), Users.findOneByEmail(request.payload.email)])
        .spread(function (foundByUsername, foundByEmail) {

            if (foundByUsername) {
                return reply({
                    response: Boom.badRequest('this username is already in use.'),
                    status: false
                });
            }

            if (foundByEmail) {
                return reply({
                    response: Boom.badRequest('this email is already in use.'),
                    status: false
                });
            }

            return reply({ status: true });

        })
        .catch(function (err) {

            return reply({
                response: Boom.badImplementation(err),
                status: false
            });
        })
        .done();
    }, assign: 'validation' }],
    handler: (request, reply) => {

        const validation = request.pre.validation;

        if (!validation.status) {
            return reply(validation.response);
        }

        const Users = request.collections.user;
        const Permissions = request.collections.permission;
        const OnhandsLocation = request.collections.onhandlocation;
        const OnhandsWarehouse = request.collections.onhandwarehouse;
        const SalesLocation = request.collections.saleslocation;
        const SalesWarehouse = request.collections.saleswarehouse;
        const SalesChannel = request.collections.saleschannel;
        let perUser = null;
        let perId = null;

        Users
        .create(request.payload)
        .then(function (user) {

            return Permissions.update({ id: user.permission }, { user: user.id });
        })
        .then(function ([permission, ...rest]) {
            perUser = permission;
            const onhandsLocation = OnhandsLocation.update({ id: permission.onhandLocation }, { permission: permission.id });
            const onhandsWarehouse = OnhandsWarehouse.update({ id: permission.onhandWarehouse }, { permission: permission.id });
            const salesLocation = SalesLocation.update({ id: permission.salesLocation }, { permission: permission.id });
            const salesWarehouse = SalesWarehouse.update({ id: permission.salesWarehouse }, { permission: permission.id });
            const salesChannel = SalesChannel.update({ id: permission.salesChannel }, { permission: permission.id });
            Promise.all([onhandsLocation,onhandsWarehouse,salesLocation,salesWarehouse,salesChannel])
            .then(function(onhand){
                if(onhand[0].length != 0){
                    perId = onhand[0].permission;
                }else{
                    if(onhand[1].length != 0){
                        perId = onhand[1].permission;
                    }else{
                        console.log('perUser--> 0 ');
                    }
                }
                return onhand;
            })
            .then(function ([onhand, ... rest]) {
                return Permissions
                .findOne({ id: perId })
                .populate('onhandLocation')
                .then(function (permission) {
                    return permission;
                });
            })
            .then(function (permission) {
                return Users
                .findOne({ id: perUser.user })
                .then(function (user) {
                    return reply({ data: user.toJSON() });
                });
            });
        })
        .catch((err) => {
            console.log('err-->',err);
            return reply(Boom.badImplementation(err));
        })
        .done();
    }
};
