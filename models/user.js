"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.associate = function (models) {
        User.hasMany(models.CurahHujan, { foreignKey: "userId" });
      };
    }
  }
 User.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    tanggal_lahir: DataTypes.STRING,
    alamat: DataTypes.STRING,
    nomor_telepon: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    jabatan: DataTypes.STRING,
    kode: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users", // ini juga penting, supaya modelnya tahu nama tabel yang benar
    underscored: true,  // supaya field created_at, updated_at otomatis cocok
  }
);

  return User;
};
