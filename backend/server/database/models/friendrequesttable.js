'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class friendRequestTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  friendRequestTable.init({
    senderId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'friendRequestTable',
  });
  return friendRequestTable;
};