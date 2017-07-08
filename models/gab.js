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

  Gab.prototype.showDeleteIfOwner = function() {
      return function (val, render) {
        const id = render(val);
        if (id == this.user_id) {
          // render the delete button
        return render(` <form class="" action="/delete/{{id}}" method="post">
          <input type="submit" name="delete" value="Delete" id="{{id}}">  </form>`);
              }
      };
    };
  return Gab;
};
