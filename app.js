const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const parseurl = require('parseurl');
const path = require('path');
const expressValidator = require('express-validator');
const session = require('express-session');
const models = require('./models');

const welcomeController = require('./controllers/welcome-user');
const gabController = require('./controllers/gab-user');
const indexController = require('./controllers/index-user');
const likesController = require('./controllers/likes-user');

const app = express();

app.use(express.static('public'));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');


// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressValidator({
  additionalValidators: 'equals'
}));

// MIDDLEWARE WE WROTE
app.use(session({
  secret: 'Covfefe'
  , resave: false
  , saveUninitialized: false
}));

// redirects back to login or signup if name is not already stored in session
var backToLogin = function(req, res, next) {
  var pathname = parseurl(req).pathname;
  console.log(req.session.username);
  console.log(pathname);
  if (!req.session.username && pathname != '/welcome') {
    res.redirect('/welcome');
  } else {
    next();
  }
};

// REQUESTS
// get and render the home page with all the gabs after login
app.get('/', backToLogin, indexController.renderIndex);

// get and render the welcome/login/sign in page
app.get('/welcome', welcomeController.renderWelcome);

// get and render the create a gab page
app.get('/gab', backToLogin, gabController.renderGab);

// get and render the page with a gab that shows all it's likes
app.get('/likes/:id', backToLogin, likesController.renderGabLikes);

// post and sign up and send user info to database
app.post('/signup', welcomeController.signupWelcome);

// post and sign into account
app.post('/signin', welcomeController.signinWelcome);

// post and like a gab
app.post('/:id', backToLogin, indexController.clickLikeIndex);

// post and delete gab if you are the user who posted it
app.post('/delete/:id', backToLogin, indexController.deleteGabIndex);

// write a gab
app.post('/gab', gabController.postGab);

app.listen(3000, function(){
  console.log('Successfully initiated express application');
});

// checking to see if user is in session
// app.use(function(req, res, next) {
//   const sess = req.session;
//   if(!sess.userId)
// })

// creates a route that renders the sign up view
// router.get("/signup", function(req, res) {
//   res.render("users/signup");
// });
