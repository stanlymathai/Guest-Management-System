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
     CREATE TABLE user_profile (
      id bigint(20) NOT NULL AUTO_INCREMENT,
      user_id bigint(20) NOT NULL,
      first_name varchar(45) NOT NULL,
      last_name varchar(45) NOT NULL,
      phone char(20) DEFAULT NULL,
      image varchar(255) DEFAULT NULL,
      country_id int(11) DEFAULT NULL,
      organization varchar(45) DEFAULT NULL,
      created_by bigint(20) DEFAULT NULL,
      updated_by bigint(20) DEFAULT NULL,
      created_at datetime DEFAULT NULL,
      updated_at datetime DEFAULT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY user_id_UNIQUE (user_id),
      KEY fk_user_profile_country_idx (country_id),
      CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES auth_user (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
      CONSTRAINT fk_user_profile_country FOREIGN KEY (country_id) REFERENCES country (id) ON DELETE NO ACTION ON UPDATE NO ACTION
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
