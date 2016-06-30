'use strict';

module.exports = {
  schema: true,
  autoPK: false,
  identity: 'permission',
  connection: 'mysql',
  migrate: 'alter',
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
    onhandLocation: {
      model: 'onhandLocation'
    },
    onhandWarehouse: {
      model: 'onhandWarehouse'
    },
    price: {
      type: 'string',
      enum: ['Public', 'Updated', 'All'],
      required: true
    },
    user: {
      model: 'user'
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
