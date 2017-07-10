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
    var context = {
      loggedIn: true,
      name: req.session.username,
      signedIn: true,
      loggedInUser: req.session.userId,
      modelArray:[]
    };
    models.Gab.findAll({
      include: [
        {
          model: models.User,
          as: 'users'
        }, 'UserLikes'],
      order: [['createdAt', 'DESC']]
    }).then(function(gabs){
      context.model = gabs;
      console.log(context.modelArray);
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
      gab.addUserLikes(req.session.userId);
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
      //   where: {id: Number(req.params.id), user_id: req.session.userId}
      // }).then(function(gab) {
      //   console.log(gab);
      //   gab.getUserLikes({
      //     where: {gab_id: req.params.id}
      //   }).then(function(newGab) {
      //     console.log(newGab);
      //   });
      // });
      // models.Gab.userGabs.destroy({
      //   where: {gab_id: req.params.id, user_id: req.session.userId}
      // }).then(function() {
      // console.log(models.Gab);
        models.Gab.destroy(
        {
        where: { id: req.params.id, user_id: req.session.userId}
      }).then(function() {
        res.redirect('/');
      });
    // });
  }


};
