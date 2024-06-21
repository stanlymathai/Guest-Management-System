"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `ALTER TABLE email_template ADD client_id int NULL AFTER type;`
    );
    await queryInterface.sequelize.query(
      `ALTER TABLE email_template ADD CONSTRAINT email_template_FK FOREIGN KEY (client_id) REFERENCES client(id);`
    );
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
