'use strict' ;

module.exports = {
    schema: true,
    autoPK: false,
    identity: 'permission',
    connection: 'mysql',
    migrate: 'safe',
    tableName: 'Permission',
    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },
        productGroup: {
            type: 'integer',
            required: true
        },
        productGroupSales: {
            type: 'integer',
            required: true
        },
        onhandLocation: {
            model: 'onhandLocation'
        },
        onhandWarehouse: {
            model: 'onhandWarehouse'
        },
        salesLocation: {
            model: 'salesLocation'
        },
        salesWarehouse: {
            model: 'salesWarehouse'
        },
        price: {
            type: 'string',
            enum: ['Public', 'Updated', 'All','NULL'],
            required: true
        },
        priceSales: {
            type: 'integer',
            required: true
        },
        userType: {
            type: 'string',
            enum: ['OnHand', 'Sales', 'All'],
            required: true
        },
        category:{
            type: 'integer'
        },
        salesCategory:{
            type: 'integer'
        },
        user: {
            model: 'user'
        },
        notUseHierarchy:{
            type: 'string'
        },
        notUseSalesHierarchy:{
            type: 'string'
        },
        toJSON: function () {
            var obj = this.toObject();
            delete obj.user;
            delete obj.createdAt;
            delete obj.updatedAt;
            return obj;
        }
    }
};
