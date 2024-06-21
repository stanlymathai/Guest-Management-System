'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.query(`CREATE TABLE queue_message (
      id bigint(20) NOT NULL AUTO_INCREMENT,
      parent_id bigint(20) DEFAULT '0',
      queue varchar(255) NOT NULL,
      payload longtext NOT NULL,
      priority smallint(6) NOT NULL,
      created_at datetime DEFAULT NULL,
      deleted_at datetime DEFAULT NULL,
      updated_at datetime DEFAULT NULL,
      status tinyint(1) NOT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8`)
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
