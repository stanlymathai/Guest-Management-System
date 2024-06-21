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
     CREATE TABLE client_user (
      id int(11) NOT NULL,
      client_id int(11) DEFAULT NULL,
      user_id bigint(20) DEFAULT NULL,
      role_id int(11) DEFAULT NULL,
      created_by int(11) DEFAULT NULL,
      updated_by int(11) DEFAULT NULL,
      created_at datetime DEFAULT NULL,
      updated_at datetime DEFAULT NULL,
      PRIMARY KEY (id),
      KEY fk_client_user_client_idx (client_id),
      KEY fk_client_user_user_idx (user_id),
      CONSTRAINT fk_client_user_client FOREIGN KEY (client_id) REFERENCES client (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
      CONSTRAINT fk_client_user_user FOREIGN KEY (user_id) REFERENCES auth_user (id) ON DELETE NO ACTION ON UPDATE NO ACTION
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
