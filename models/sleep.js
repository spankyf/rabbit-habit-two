"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sleep extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sleep.init(
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      bedtime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      sleeptime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      waketime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      dreams_from_three: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 3,
        },
      },
      interruptions: {
        type: DataTypes.INTEGER,
      },
      pee: {
        type: DataTypes.INTEGER,
      },
      rating_from_five: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      duration: {
        type: DataTypes.VIRTUAL,
        get() {
          const lostTime = this.pee * 10 + this.interruptions * 20;
          const duration = this.waketime - this.sleeptime;
          return (duration - lostTime) / 60000;
        },
      },

      interruptions: {
        type: DataTypes.INTEGER,
      },
      pee: {
        type: DataTypes.INTEGER,
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
      modelName: "Sleep",
    }
  );
  return Sleep;
};
