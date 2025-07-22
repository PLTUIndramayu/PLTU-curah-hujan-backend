// "use strict";
// const bcrypt = require("bcryptjs");

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.bulkInsert("users", [
//       {
//         name: "Admin",
//         email: "admin@example.com",
//         password: await bcrypt.hash("admin123", 10),
//         role: "admin",
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//       {
//         name: "Super Admin",
//         email: "superadmin@example.com",
//         password: await bcrypt.hash("admin123", 10),
//         role: "superadmin",
//         created_at: new Date(),
//         updated_at: new Date(),
//       },
//     ]);
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.bulkDelete("users", {
//       email: {
//         [Sequelize.Op.in]: ["admin@example.com", "superadmin@example.com"],
//       },
//     });
//   },
// };



// 'use strict';
// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable('curah_hujan', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       tanggal: {
//         type: Sequelize.DATE
//       },
//       jam: {
//         type: Sequelize.TIME
//       },
//       umur_HSS: {
//         type: Sequelize.INTEGER
//       },
//       tanaman: {
//         type: Sequelize.STRING
//       },
//       user_id: {
//         type: Sequelize.INTEGER
//       },
//       varietas: {
//         type: Sequelize.STRING
//       },
//       sumber_air: {
//         type: Sequelize.STRING
//       },
//       OPT: {
//         type: Sequelize.STRING
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable('curah_hujan');
//   }
// };
