const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const models = require('../models');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

module.exports = {
  renderIndex: function(req, res) {
    models.Gab.findAll({
      include: [
        {
          model: models.User,
          as: 'users'
        }],
      order: [['createdAt', 'DESC']]
    }).then(function(gab){
      var context = {
        model: gab
        , sessionName: req.session.username
        , sessionId: req.session.userId
        // , numberLikes: function() {
        //   models.Like.findAll({where: {gab_id: req.params.id}}).then(function(likes) {
        //     var numLikes = likes.length;
        //       console.log(numLikes);
        //       return numLikes;
        //   })
          // models.Like.findAll(
          //   { where: {gab_id: req.body.id} }
          // ).then (function(likes) {
          //   var numLikes = likes.length;
          //   console.log(numLikes);
          //   return numLikes;
          // })
        };
        res.render('index', context);
      });
    // });
  }
  , clickLikeIndex: function(req, res) {
    console.log('wrong working');
    models.Gab.findOne(
      {where: {id: req.params.id},
      include: [{
        model: models.User,
        as: 'users'
      }],
    }).then(function(gab) {
      gab.setUserLikes(req.session.userId);
      res.redirect('/');
    })

  }
  , deleteGabIndex: function(req, res) {
      // models.User.findOne({
      //   where: {id: req.session.userId}
      // }).then(function(user) {
      //   console.log(user);
      //   user.getGabLikes({
      //     where: {id: req.params.id}
      //   }).then(function(gab) {
      //     console.log(gab);
      //     gab.remove();
      //     res.redirect('/');
      //     });
      //   });
      // }
      // models.Gab.findOne({
      //   where: {id: req.params.id, user_id: req.session.userId}
      // }).then(function(gab) {
      //   console.log(gab);
      //   gab.getUserLikes({
      //     where: {gab_id: req.params.id}
      //   }).then(function(gabLikes) {
      //     console.log(gabLikes);
      //   })
      // });
      // models.Gab.userGabs.destroy({
      //   where: {gab_id: req.params.id, user_id: req.session.userId}
      // }).then(function() {
      console.log(models.Gab);
        models.Gab.destroy(
        {
        where: { id: req.params.id, user_id: req.session.userId}
      }).then(function() {
        res.redirect('/');
      });
    // });
  }


};
