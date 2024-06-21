"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`ALTER TABLE location
    ADD client_id INT NOT NULL AFTER description,
    ADD CONSTRAINT fk_location_client FOREIGN KEY(client_id) REFERENCES client(id);`);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
