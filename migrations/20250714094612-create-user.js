"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      nama: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      foto_profil:{
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
      },
      tanggal_lahir: {
        type: Sequelize.DATE,
      },
      alamat: {
        type: Sequelize.STRING,
      },
      nomor_telepon: {
        type: Sequelize.STRING,
      },
      jabatan: {
        type: Sequelize.STRING,
      },
      kode_user: {
        type: Sequelize.STRING,
      },
      kode_stasiun: {
        type: Sequelize.STRING,
      },
      tgl_mulai_bekerja: {
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
