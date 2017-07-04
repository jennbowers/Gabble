const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const models = require('../models');

module.exports = {
  renderGab: function(req, res) {
    var context = {
      sessionName: req.session.username
    };
    res.render('gab', context);
  }
  , postGab: function(req, res) {
    models.Gab.create({
      message: req.body.message
      , user_id: req.session.userId
    }).then(function(newGab) {
      req.session.newGab = newGab.message;
    });
    res.redirect('/');
  }
};
