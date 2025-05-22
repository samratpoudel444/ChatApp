"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("messageTables", {
      fields: ["senderId"],
      type: "foreign key",
      name: "fk_messages_sender",
      references: {
        table: "UserTables",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    
    await queryInterface.addConstraint("messageTables", {
      fields: ["recieverId"],
      type: "foreign key",
      name: "fk_messages_receiver",
      references: {
        table: "UserTables",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeConstraint("messageTables", "fk_messages_sender");
    await queryInterface.removeConstraint( "messageTables","fk_messages_receiver"
    );
  },
};
