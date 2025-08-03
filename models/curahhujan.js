"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CurahHujan extends Model {
    static associate(models) {
      CurahHujan.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  CurahHujan.init(
    {
      tanggal: DataTypes.DATE,
      jam: DataTypes.TIME,
      umur_hss: DataTypes.INTEGER,
      umur_tanaman: DataTypes.STRING,
      curah_hujan: DataTypes.FLOAT,
      sifat_hujan: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      varietas: DataTypes.STRING,
      sumber_air: DataTypes.STRING,
      opt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CurahHujan",
      tableName: "curah_hujan",
      underscored: true,
    }
  );
  return CurahHujan;
};
