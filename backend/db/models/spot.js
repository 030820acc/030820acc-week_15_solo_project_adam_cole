'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    photoUrl: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Spot.associate = function(models) {
    Spot.hasOne(models.User, {foreignKey: 'userId'})
    Spot.belongsTo(models.Review, {foreignKey: 'spotId'})
  };
  return Spot;
};