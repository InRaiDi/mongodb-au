var express = require('express');
var app = express();
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);

var database = mongoose.connection;

var User = require('../models/user');

// Session
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: database
  })
}));

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(function(err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/login');
      }
    });
  }
});

app.post('/login', (req, res) => {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        console.log(err);
        res.redirect('/login');
      } else {
        req.session.user = user._id;
        if (user.admin) {
          req.session.admin = user.admin;
        }
        return res.redirect('/');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    console.log(err);
    res.redirect('/login');
  }
});

app.post('/register', (req, res) => {
  if (req.body.email && req.body.password && req.body.passwordConfirm) {
    if (req.body.password === req.body.passwordConfirm) {
      userData = {
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        admin: req.body.admin
      };

      User.create(userData, function (err, user) {
        if (err) {
          console.log(err);
          res.redirect('/register');
        } else {
          req.session.user = user._id;
          if (req.body.admin) {
            req.session.admin = req.body.admin;
          }
          res.redirect('/');
        }
      });
    } else {
      res.redirect('/register');
    }
  } else {
    res.redirect('/register');
  }
});

module.exports = app;
