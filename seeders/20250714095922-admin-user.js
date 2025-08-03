"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    console.log("Seeder dijalankan!");

    await queryInterface.bulkInsert("users", [
      {
        nama: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
        tanggal_lahir: "1990-01-01",
        alamat: "Jalan Admin",
        nomor_telepon: "08123456789",
        jabatan: "Kepala",
        kode: "ADM001",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nama: "Super Admin",
        email: "superadmin@example.com",
        password: hashedPassword,
        role: "superadmin",
        tanggal_lahir: "1985-05-05",
        alamat: "Jalan Super",
        nomor_telepon: "08123456788",
        jabatan: "Manager",
        kode: "ADM002",
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


