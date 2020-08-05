"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sensimilla extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sensimilla.init(
    {
      date: {
        type: DataTypes.DATEONLY,
        // allowNull: false,

        primaryKey: true,
      },
      mg: {
        type: DataTypes.REAL,
      },
      mg_time: {
        type: DataTypes.DATE,
      },
      j: {
        type: DataTypes.INTEGER,
      },

      rating_from_three: {
        type: DataTypes.INTEGER,

        validate: {
          min: 0,
          max: 3,
        },
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
      modelName: "Sensimilla",
    }
  );
  return Sensimilla;
};
