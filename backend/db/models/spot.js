'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    photoUrl: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Spot.associate = function(models) {
    Spot.belongsTo(models.User, {foreignKey: 'userId'})
    Spot.hasMany(models.Review, {foreignKey: 'spotId'})
  };
  return Spot;
};