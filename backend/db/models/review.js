'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    Review.hasOne(models.User, {foreignKey: "userId"})
    Review.belongsTo(models.Spot, {foreignKey: "spotId"})
  };
  return Review;
};