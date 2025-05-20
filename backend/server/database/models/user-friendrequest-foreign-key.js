'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user - friendRequest - foreign - key extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user - friendRequest - foreign - key.init({
    senderId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user-friendRequest-foreign-key',
  });
  return user - friendRequest - foreign - key;
};