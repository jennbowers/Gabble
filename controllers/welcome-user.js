const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const models = require('../models');

module.exports = {
  renderWelcome: function(req, res) {
    req.session.userId = '';
    req.session.username = '';
    res.render('welcome', {});
  }
  , signupWelcome: function(req, res) {
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
    });

  }
  , signinWelcome: function(req, res) {
    var signin_username = req.body.username;
    var signin_password = req.body.password;
    // console.log(req.body.username);
    // VALIDATE THEY ARE A REAL USER
    models.User.findOne(
      {where: {
          username: signin_username
          , password: signin_password
        }
      }).then(function(user) {
        req.session.username = user.username;
        req.session.userId = user.id;
        console.log('sign in', req.session.username);
        res.redirect('/');
      });
  }
};
