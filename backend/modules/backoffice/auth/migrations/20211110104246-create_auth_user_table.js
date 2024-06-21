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
     CREATE TABLE auth_user (
      id bigint(20) NOT NULL AUTO_INCREMENT,
      email varchar(45) DEFAULT NULL UNIQUE,
      password_hash varchar(255) DEFAULT NULL,
      auth_access_token varchar(255) DEFAULT NULL,
      role_id int(10) DEFAULT NULL,
      status int(10) DEFAULT NULL,
      login_count varchar(45) DEFAULT NULL,
      created_by bigint(20) DEFAULT NULL,
      updated_by bigint(20) DEFAULT NULL,
      created_at datetime DEFAULT NULL,
      updated_at datetime DEFAULT NULL,
      PRIMARY KEY (id),
      KEY fk_auth_user_role_idx (role_id),
      CONSTRAINT fk_auth_user_role FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;`)
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
