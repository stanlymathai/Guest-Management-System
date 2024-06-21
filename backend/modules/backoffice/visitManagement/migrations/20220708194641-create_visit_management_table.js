"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.sequelize.query(`
    CREATE TABLE visit_management (
      id BIGINT auto_increment NOT NULL,
      first_name varchar(45) NOT NULL,
      last_name varchar(45) NOT NULL,
      email varchar(45) NOT NULL,
      organization varchar(45) NOT NULL,
      reason varchar(255) NOT NULL,
      visit_status TINYINT NOT NULL,
      bolo_status TINYINT NULL,
      recurring TINYINT NULL,
      client_id INT NOT NULL,
      location_id INT NOT NULL,
      host_id BIGINT NOT NULL,
      notify_host TINYINT NULL,
      host_name varchar(100) NOT NULL,
      token varchar(255) NOT NULL,
      image varchar(900) NULL,
      qr_code varchar(900) NULL,
      schedule_time_from DATETIME NOT NULL,
      schedule_time_to DATETIME NOT NULL,
      check_in_date_time DATETIME NULL,
      host_collected_at DATETIME NULL,
      check_out_date_time DATETIME NULL,
      created_by BIGINT NOT NULL,
      created_at DATETIME NULL,
      updated_by BIGINT NULL,
      updated_at DATETIME NULL,
      PRIMARY KEY (id),
      KEY fk_visit_management_client_idx (client_id),
      KEY fk_visit_management_location_idx (location_id),
      KEY fk_visit_management_host_idx (host_id),
      KEY fk_visit_management_owner (created_by),
      CONSTRAINT visit_management_FK FOREIGN KEY (client_id) REFERENCES client(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
      CONSTRAINT visit_management_FK_1 FOREIGN KEY (location_id) REFERENCES location(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
      CONSTRAINT visit_management_FK_2 FOREIGN KEY (host_id) REFERENCES auth_user(id) ON DELETE NO ACTION ON UPDATE NO ACTION,
      CONSTRAINT visit_management_FK_3 FOREIGN KEY (created_by) REFERENCES auth_user(id) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
     `);
  },

  down: async (queryInterface, Sequelize) => {},
};
