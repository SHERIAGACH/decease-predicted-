'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hospital extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.hospital.belongsToMany(models.specialisation, {
        through: 'SpecialisationHospital',
        foreignKey: 'specialisationId',
      });
      // models.hospital.belongsToMany(models.specialisation,{
      //   foreignKey:{
      //     allowNull:false
      //   }
      // });

    }
  }
  hospital.init({
    name: DataTypes.STRING,
    adresse: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'hospital',
  });
  return hospital;
};