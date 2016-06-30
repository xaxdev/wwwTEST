'use strict';

module.exports = {
  schema: true,
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  identity: 'authentication',
  connection: 'mysql',
  migrate: 'alter',
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
      type: 'string'
    },
    token: {
      type: 'string'
    }
  }
};
