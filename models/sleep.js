'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sleep extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Sleep.init({
    date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Sleep',
  });
  return Sleep;
};