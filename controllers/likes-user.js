const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const models = require('../models');

module.exports = {
  renderLikes: function(req, res) {
    res.render('likes', {});
  }
  , renderGabLikes: function(req, res) {
    var context = {};
    for (var i = 0; i < models.Gab.length; i++) {
      context = models.Gab[i];
      if (models.Gab.id == req.params.id) {
        break;
      }
    }
    res.render('likes', context);
  }
};
