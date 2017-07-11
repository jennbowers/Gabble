const models = require('../models');
const Sequelize = require('sequelize');

module.exports = {
  renderWelcome: function(req, res) {
    req.session.userId = '';
    req.session.username = '';
    res.render('welcome', {});
  }
  , signupWelcome: function(req, res) {
    if (req.body.first_name && req.body.last_name && req.body.username && req.body.password) {
      models.User.create({
        first_name: req.body.first_name
        , last_name: req.body.last_name
        , username: req.body.username
        , password: req.body.password
      }).then(function(newUser) {
        req.session.username = newUser.username;
        req.session.userId = newUser.id;
        console.log('signup username', req.session.username);
        console.log('signup id', req.session.userId);
        res.redirect('/');
      }).catch(Sequelize.UniqueConstraintError, function(error) {
        console.log('unique error ', error);
        var context= {
          msg: error.message
        };
        res.render('welcome', context);
      }).catch(Sequelize.ValidationError, function(error) {
        console.log('validation error ', error);
        var context = {
          msg: error.message
        };
        res.render('welcome', context);
      });
    } else if (!req.body.first_name || !req.body.last_name || !req.body.username || !req.body.password) {
      var context = {
        msg: 'Please provide all information'
      };
      res.render('welcome', context);
    }
    // res.redirect('/');
    }
  , signinWelcome: function(req, res) {
    if (req.body.username && req.body.password) {
      var signin_username = req.body.username;
      var signin_password = req.body.password;
      console.log(req.body.username);
      // VALIDATE THEY ARE A REAL USER
      models.User.findOne(
        {where: {
            username: signin_username
            // , password: signin_password
          }
        }).then(function(user) {
            req.session.username = user.username;
            req.session.userId = user.id;
            console.log('sign in', req.session.username);
            console.log('user id', req.session.userId);
            res.redirect('/');
        });
      } else if (!req.body.username || !req.body.password) {
        var context = {
          msg: 'Please provide all information'
        };
        res.render('welcome', context);
      }
  }
};
