'use strict';

module.exports = {
    schema: true,
    autoPK: false,
    identity: 'salesLocation',
    connection: 'mysql',
    migrate: 'safe',
    tableName: 'PermissionSalesLocation',
    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: 'string',
            required: true
        },
        places: {
            type: 'array'
        },
        permission: {
            model: 'permission'
        },
        toJSON: function () {
            var obj = this.toObject();
            delete obj.permission;
            delete obj.createdAt;
            delete obj.updatedAt;
            return obj;
        }
    }
};
