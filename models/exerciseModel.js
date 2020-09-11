"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Exercise.init(
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,

        primaryKey: true,
      },
      exercise: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      exercise_type: {
        type: DataTypes.ENUM("walking", "gym", "jogging"),
      },
      ailment: {
        type: DataTypes.INTEGER,
        validate: { max: 3, min: 0 },
      },
      stretching: {
        type: DataTypes.INTEGER,
      },
      ailment_type: { type: DataTypes.STRING },

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
      modelName: "Exercise",
    }
  );
  return Exercise;
};
