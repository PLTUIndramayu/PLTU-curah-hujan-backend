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
        user_id: "745660fb-2895-4b15-9826-7d9d0d106406",
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
        user_id: "5d12b0fc-729c-472e-9bbd-c02e617470eb",
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
