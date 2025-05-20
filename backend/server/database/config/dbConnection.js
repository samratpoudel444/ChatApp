const {Sequelize}= require('sequelize');
const config = require("/Users/samrat/Desktop/ChatApp/backend/server/database/config/config.json");


    const sequelize = new Sequelize(
      config.development.database,
      config.development.username,
      config.development.password,

      {
        host:  config.development.host,
        dialect:  config.development.dialect,
      }
    );


module.exports= sequelize;