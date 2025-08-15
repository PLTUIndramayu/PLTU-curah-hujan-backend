"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CurahHujan extends Model {
    static associate(models) {
      CurahHujan.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }

  CurahHujan.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      tanggal: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      jam: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      umur_hss: DataTypes.INTEGER,
      umur_tanaman: DataTypes.STRING,
      curah_hujan: DataTypes.FLOAT,
      sifat_hujan: DataTypes.STRING,
      varietas: DataTypes.STRING,
      sumber_air: DataTypes.STRING,
      opt: DataTypes.STRING,
      keterangan: DataTypes.STRING,
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
