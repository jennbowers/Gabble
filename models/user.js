'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Gab, {as: 'messages', foreignKey: 'user_id'});
    User.belongsToMany(models.Like, {as: 'users', through: 'Likes', foreignKey: 'user_id'});
  };



  return User;
};
