"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CurahHujan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CurahHujan.associate = function (models) {
        CurahHujan.belongsTo(models.User, { foreignKey: "userId" });
      };
    }
  }
  CurahHujan.init(
    {
      tanggal: DataTypes.DATE,
      jam: DataTypes.TIME,
      umurHSS: DataTypes.INTEGER,
      tanaman: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      varietas: DataTypes.STRING,
      sumber_air: DataTypes.FLOAT,
      OPT: DataTypes.STRING,

    },
    {
      sequelize,
      modelName: "CurahHujan",
    }
  );
  return CurahHujan;
};
