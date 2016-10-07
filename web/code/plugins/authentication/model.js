'use strict';

module.exports = {
    schema: true,
    autoPK: false,
    autoCreatedAt: false,
    autoUpdatedAt: false,
    identity: 'authentication',
    connection: 'mysql',
    migrate: 'safe',
    tableName: 'Authentication',
    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },
        user: {
            type: 'string',
            index: true
        },
        device: {
            type: 'string',
            index: true
        },
        token: {
            type: 'string'
        },
        iPad: {
            type: 'boolean',
            defaultsTo: false
        }
    },
    clear: function (email) {

        const Authentication = this;

        return Authentication.destroy({
            user: email,
            iPad: true
        });
    }
};
