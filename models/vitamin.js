"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vitamin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vitamin.init(
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      hair_oil: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      cod_liver_oil: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      ginseng: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
      Vitamin_d: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },

    {
      sequelize,
      modelName: "Vitamin",
      // hooks: {
      //   afterFind: (sleep, options) => {
      //     console.log(sleep);
      //   },
      // },
    }
  );

  return Vitamin;
};
