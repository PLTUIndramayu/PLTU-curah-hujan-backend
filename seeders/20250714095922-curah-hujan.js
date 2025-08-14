"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("curah_hujan", [
      {
        id: uuidv4(),
        tanggal: new Date("2025-08-01"),
        jam: "07:00:00",
        umur_hss: 21,
        umur_tanaman: "14 hari",
        curah_hujan: 12.5,
        sifat_hujan: "Sedang",
        user_id: "d452b307-1f5a-4716-b701-c2a1d0a99d36",
        varietas: "Ciherang",
        sumber_air: "Irigasi",
        opt: "Wereng",
        keterangan: "Tidak ada",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        tanggal: new Date("2025-08-02"),
        jam: "08:30:00",
        umur_hss: 22,
        umur_tanaman: "15 hari",
        curah_hujan: 25.8,
        sifat_hujan: "Lebat",
        user_id: "5d311e2a-a081-440e-97d5-b900cd42533b",
        varietas: "Inpari 32",
        sumber_air: "Hujan",
        opt: "Penggerek batang",
        keterangan: "Ada serangan hama",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("curah_hujan", null, {});
  },
};
