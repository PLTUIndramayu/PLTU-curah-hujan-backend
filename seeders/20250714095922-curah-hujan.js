"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("curah_hujan", [
      {
        tanggal: new Date("2025-08-01"),
        jam: "07:00:00",
        umur_hss: 21,
        umur_tanaman: "14 hari",
        curah_hujan: 12.5,
        sifat_hujan: "Sedang",
        user_id: 1,
        varietas: "Ciherang",
        sumber_air: "Irigasi",
        opt: "Wereng",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        tanggal: new Date("2025-08-02"),
        jam: "08:30:00",
        umur_hss: 22,
        umur_tanaman: "15 hari",
        curah_hujan: 25.8,
        sifat_hujan: "Lebat",
        user_id: 2,
        varietas: "Inpari 32",
        sumber_air: "Hujan",
        opt: "Penggerek batang",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("curah_hujan", null, {});
  },
};
