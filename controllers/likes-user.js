const models = require('../models');

module.exports = {
  renderLikes: function(req, res) {
    res.render('likes', {});
  },
  displayLikes: function(req, res) {
    models.Gab.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: models.User,
        as: 'users'
      }]
    }).then(function(gab) {
      // console.log(gab);
      gab.getUserLikes().then(function(result) {
        // console.log(result, result.length);
        var context = {
          model: gab,
          name: req.session.name,
          loggedIn: true,
          signedIn: true,
          likes: []
        };
        for (var i = 0; i < result.length; i++) {

          // console.log(result[i].username);
          context.likes.push(result[i].username);
          // console.log("LIKES ", context.likes);
        }
        res.render('likes', context);
      });
    });
  },
};
