'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user - message - foreign - key extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user - message - foreign - key.init({
    senderId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user-message-foreign-key',
  });
  return user - message - foreign - key;
};