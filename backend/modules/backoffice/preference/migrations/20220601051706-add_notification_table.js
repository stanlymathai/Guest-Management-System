"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize
      .query(`CREATE TABLE notification (
      id INT NOT NULL,
      client_id INT NOT NULL,
      type TINYINT NOT NULL,
      user_email TINYINT NOT NULL,
      user_sms TINYINT NOT NULL,
      host_email TINYINT NOT NULL,
      host_sms TINYINT NOT NULL,
      created_by bigint(20) DEFAULT NULL,
      updated_by bigint(20) DEFAULT NULL,
      created_at datetime DEFAULT NULL,
      updated_at datetime DEFAULT NULL,
      PRIMARY KEY (id),
      CONSTRAINT notifications_FK FOREIGN KEY (client_id) REFERENCES client(id)
    )
    ENGINE=InnoDB
    DEFAULT CHARSET=utf8`);
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
