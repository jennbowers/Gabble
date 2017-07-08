const models = require('../models');

module.exports = {
  renderLikes: function(req, res) {
    res.render('likes', {});
  }
  , renderGabLikes: function(req, res) {
    console.log('working');
    models.Gab.findOne({
      where: {id: req.params.id},
      include: [{
        model: models.User,
        as: 'users'
      }]
    }).then(function(gab) {
      console.log(gab);
      var context = {
        model:gab
      };
      res.render('likes', context);
    });
  }
};
