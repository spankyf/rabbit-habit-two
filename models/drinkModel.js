"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Drink extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Drink.init(
    {
      date: {
        type: DataTypes.DATEONLY,
        // allowNull: false,

        primaryKey: true,
      },
      drink_end: {
        type: DataTypes.DATE,
      },
      n_drinks: {
        type: DataTypes.REAL,
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
      modelName: "Drink",
    }
  );
  return Drink;
};
