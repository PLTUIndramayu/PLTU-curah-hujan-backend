'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('curah_hujan', {
       id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
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
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
      keterangan: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('curah_hujan');
  }
};
