'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.sequelize.query(`
     CREATE TABLE client (
      id int(11) NOT NULL,
      name varchar(255) NOT NULL,
      code varchar(45) DEFAULT NULL,
      status int(10) DEFAULT NULL,
      created_by bigint(20) DEFAULT NULL,
      updated_by bigint(20) DEFAULT NULL,
      created_at datetime DEFAULT NULL,
      updated_at datetime DEFAULT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
