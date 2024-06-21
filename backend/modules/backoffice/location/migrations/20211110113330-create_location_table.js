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
     CREATE TABLE location (
      id int(11) NOT NULL AUTO_INCREMENT,
      name varchar(45) NOT NULL,
      primary_function varchar(45) NOT NULL,
      bolo_check tinyint(4) NOT NULL,
      phone varchar(45) NOT NULL,
      description varchar(45) DEFAULT NULL,
      country_id int(11) NOT NULL,
      physical_address varchar(45) NOT NULL,
      post_code varchar(45) NOT NULL,
      time_zone varchar(45) NOT NULL,
      date_format varchar(45) NOT NULL,
      time_format varchar(45) NOT NULL,
      status int(10) DEFAULT 1,
      created_by int(11) DEFAULT NULL,
      updated_by int(11) DEFAULT NULL,
      created_at datetime DEFAULT NULL,
      updated_at datetime DEFAULT NULL,
      PRIMARY KEY (id),
      KEY fk_location_country_idx (country_id),
      CONSTRAINT fk_location_country FOREIGN KEY (country_id) REFERENCES country (id) ON DELETE NO ACTION ON UPDATE NO ACTION
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
