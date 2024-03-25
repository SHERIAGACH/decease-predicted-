'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rendez_vous extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rendez_vous.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    id_user: DataTypes.INTEGER,
    id_hospital: DataTypes.INTEGER,
    time: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'rendez_vous',
  });
  return rendez_vous;
};