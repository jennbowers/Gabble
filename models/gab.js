'use strict';
module.exports = function(sequelize, DataTypes) {
  var Gab = sequelize.define('Gab', {
    message: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});

  Gab.associate = function(models) {
    Gab.belongsToMany(models.User, {as: 'UserLikes', through: 'userGabs', foreignKey: 'gab_id'});
    Gab.belongsTo(models.User, {as: 'users', foreignKey: 'user_id'});
  };

  return Gab;
};
