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
     CREATE TABLE company_user (
      id int(11) NOT NULL AUTO_INCREMENT,
      company_id int(11) DEFAULT NULL,
      user_id bigint(20) NOT NULL,
      created_by int(11) DEFAULT NULL,
      updated_by int(11) DEFAULT NULL,
      created_at datetime DEFAULT NULL,
      updated_at datetime DEFAULT NULL,
      PRIMARY KEY (id),
      KEY fk_company_user_company_id_idx (company_id),
      KEY fk_company_user_user_id_idx (user_id),
      CONSTRAINT fk_company_user_company_id FOREIGN KEY (company_id) REFERENCES company (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
      CONSTRAINT fk_company_user_user_id FOREIGN KEY (user_id) REFERENCES auth_user (id) ON DELETE NO ACTION ON UPDATE NO ACTION
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
