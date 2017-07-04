const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const models = require('../models');

module.exports = {
  renderIndex: function(req, res) {
    models.Gab.findAll({
      include: [
        {
          model: models.User,
          as: 'users'
        } ,
        {
          model: models.Like,
          as: 'likes'
        }
      ]
    }).then(function(gab){
      var context = {
        model: gab
        , sessionName: req.session.username
        , numberLikes: function() {
          models.Like.findAll(
            { where: {gab_id: req.body.hidden} }
          ).then (function(likes) {
            var numLikes = likes.length;
            console.log(numLikes);
            return numLikes;
          })
        }
      };
      res.render('index', context);
    });
  }
  , clickLikeIndex: function(req, res) {
    models.Like.create({
      user_id: req.session.userId
      , gab_id: req.params.id
    }).then(function(likeGab) {
      res.redirect('/');
    })

  }
};
