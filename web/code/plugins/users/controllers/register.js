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
                price: Joi.string(),
                priceSales: Joi.number().integer(),
                notUseHierarchy: Joi.string(),
                category: Joi.number().integer()
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
        const Onhands = request.collections.onhand;
        const OnhandsLocation = request.collections.onhandlocation;
        const OnhandsWarehouse = request.collections.onhandwarehouse;
        let perUser = null;
        let perId = null;

        // console.log('request.collections-->',request.collections);
        // console.log('user-->',Users);
        // console.log('Permissions-->',Permissions);
        // console.log('OnhandsLocation-->',request.collections.onhandlocation);

        Users
        .create(request.payload)
        .then(function (user) {

            return Permissions.update({ id: user.permission }, { user: user.id });
        })
        .then(function ([permission, ...rest]) {
            console.log('permission-->',permission);
            perUser = permission;
            const onhandsLocation = OnhandsLocation.update({ id: permission.onhandLocation }, { permission: permission.id });
            const onhandsWarehouse = OnhandsWarehouse.update({ id: permission.onhandWarehouse }, { permission: permission.id });
            Promise.all([onhandsLocation,onhandsWarehouse])
            .then(function(onhand){
                console.log('onhand-->',onhand);
                console.log('onhandslocation-->',onhand[0]);
                console.log('onhandswarehouse-->',onhand[1]);
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
                console.log('onhand-->',onhand);
                console.log('perUser-->',perUser);

                return Permissions
                .findOne({ id: perId })
                .populate('onhandLocation')
                .then(function (permission) {

                    return permission;
                });
            })
            .then(function (permission) {
                console.log('permission-->',permission);
                return Users
                .findOne({ id: perUser.user })
                .then(function (user) {
                    console.log('user-->',user);
                    // user.permission = permission.toJSON();
                    return reply({ data: user.toJSON() });
                });
            });
            // return onhand;
        })
        // .then(function ([permission, ...rest]) {
        //   console.log('permission-->',permission);
        //   console.log('permissionWarehouse-->',permission.onhandWarehouse);
        //   OnhandsWarehouse.update({ id: permission.onhandWarehouse }, { permission: permission.id });
        //   return Permissions;
        // })
        // .then(function ([onhandLocation, ... rest]) {
        //   console.log('onhandLocation-->',onhandLocation);
        //   return Permissions
        //     .findOne({ id: onhandLocation.permission })
        //     .populate('onhandLocation')
        //     .then(function (permission) {
        //
        //       return permission;
        //     });
        // })
        // .then(function ([onhand, ... rest]) {
        //   console.log('onhand-->',onhand);
        //   // return Permissions
        //   //   .findOne({ id: onhandWarehouse.permission })
        //   //   .populate('onhandWarehouse')
        //   //   .then(function (permission) {
        //   //
        //   //     return permission;
        //   //   });
        // })
        // .then(function (onhand) {
        //   console.log('onhand-->',onhand);
        //   // return Users
        //   //   .findOne({ id: permission.user })
        //   //   .then(function (user) {
        //   //
        //   //     user.permission = permission.toJSON();
        //   //     return reply({ data: user.toJSON() });
        //   //   });
        // })
        .catch((err) => {
            console.log('err-->',err);
            return reply(Boom.badImplementation(err));
        })
        .done();
    }
};
