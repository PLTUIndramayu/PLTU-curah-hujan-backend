'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('curah_hujan', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tanggal: {
        type: Sequelize.DATE
      },
      jam: {
        type: Sequelize.TIME
      },
      umur_hss: {
        type: Sequelize.INTEGER
      },
      umur_tanaman: {
        type: Sequelize.STRING
      },
      curah_hujan: {
        type: Sequelize.FLOAT
      },
      sifat_hujan: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      varietas: {
        type: Sequelize.STRING
      },
      sumber_air: {
        type: Sequelize.STRING
      },
      opt: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('curah_hujan');
  }
};