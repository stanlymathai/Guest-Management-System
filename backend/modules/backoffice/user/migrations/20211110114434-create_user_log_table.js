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
     CREATE TABLE user_log (
      id int(11) NOT NULL AUTO_INCREMENT,
      user_id bigint(20) DEFAULT NULL,
      user_type varchar(45) DEFAULT NULL,
      ip_address varchar(45) DEFAULT NULL,
      last_login datetime DEFAULT NULL,
      created_by int(11) DEFAULT NULL,
      update_by int(11) DEFAULT NULL,
      created_at datetime DEFAULT NULL,
      updated_at datetime DEFAULT NULL,
      PRIMARY KEY (id),
      KEY fk_user_log_user_idx (user_id),
      CONSTRAINT fk_user_log_user FOREIGN KEY (user_id) REFERENCES auth_user (id) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
     `)
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
