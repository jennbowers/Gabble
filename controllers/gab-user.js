const models = require('../models');

module.exports = {
  renderGab: function(req, res) {
    var context = {
      sessionName: req.session.username
    };
    res.render('gab', context);
  },
  postGab: function(req, res) {
    console.log('working');
    models.Gab.create({
      message: req.body.message
      , user_id: req.session.userId
    }).then(function(newGab) {
      res.redirect('/');
    });

  }
};
