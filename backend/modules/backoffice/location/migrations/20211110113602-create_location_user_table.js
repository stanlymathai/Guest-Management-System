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
     CREATE TABLE location_user (
      id bigint(20) NOT NULL AUTO_INCREMENT,
      location_id int(11) NOT NULL,
      user_id bigint(20) NOT NULL,
      created_by bigint(20) DEFAULT NULL,
      updated_by bigint(20) DEFAULT NULL,
      created_at datetime DEFAULT NULL,
      updated_at datetime DEFAULT NULL,
      PRIMARY KEY (id),
      KEY fk_company_user_location_id_idx (location_id),
      KEY fk_company_user_user_id_idx (user_id),
      CONSTRAINT fk_location_user_location_id FOREIGN KEY (location_id) REFERENCES location (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
      CONSTRAINT fk_location_user_user_id FOREIGN KEY (user_id) REFERENCES auth_user (id) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
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
