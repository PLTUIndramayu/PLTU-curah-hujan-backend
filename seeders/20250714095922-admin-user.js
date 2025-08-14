"use strict";
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    console.log("Seeder dijalankan!");

    await queryInterface.bulkInsert("users", [
      {
        id: uuidv4(),
        foto_profil: "",
        nama: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
        tanggal_lahir: "1990-01-01",
        alamat: "Jalan Admin",
        nomor_telepon: "08123456789",
        jabatan: "Kepala",
        kode_user: "USR-001",
        kode_stasiun: "STN-001",
        tgl_mulai_bekerja: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        foto_profil: "",
        nama: "Super Admin",
        email: "superadmin@example.com",
        password: hashedPassword,
        role: "superadmin",
        tanggal_lahir: "1985-05-05",
        alamat: "Jalan Super",
        nomor_telepon: "08123456788",
        jabatan: "Manager",
        kode_user: "USR-002",
        kode_stasiun: "STN-002",
        tgl_mulai_bekerja: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", {
      email: {
        [Sequelize.Op.in]: ["admin@example.com", "superadmin@example.com"],
      },
    });
  },
};
