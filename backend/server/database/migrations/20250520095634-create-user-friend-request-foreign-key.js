'use strict';

const { FOREIGNKEYS } = require('sequelize/lib/query-types');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
   await queryInterface.addConstraint("friendRequestTables", {
     fields: ["senderId"],
     type: "foreign key",
     name: "fk_senders",
     references: {
       table: "UserTables",
       field: "id",
     },
     onDelete: "CASCADE",
     onUpdate: "CASCADE",
   });

  await queryInterface.addConstraint("friendRequestTables", {
    fields: ["recieverId"],
    type: "foreign key",
    name: "fk_reciever",
    references: {
      table: "UserTables",
      field: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  },
  async down(queryInterface, Sequelize) {
     await queryInterface.removeConstraint("messages", "fk_senders");
     await queryInterface.removeConstraint("messages", "fk_reciever");
  }
};