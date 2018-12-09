var express = require('express');
var router = express.Router();
var controllers = require('./controllers.js');

router.get('/', (req, res) => {
  if (req.session.user) {
    controllers.list(req, res);
  } else {
    res.redirect('/login');
  }
});

router.get('/add', (req, res) => {
  if (req.session.user && req.session.admin) {
    console.log(req.session.admin);
    res.render('add');
  } else if (req.session.user) {
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

router.get('/edit/:id', (req, res) => {
  if (req.session.user && req.session.admin) {
    controllers.show(req, res);
  } else if (req.session.user) {
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

router.post('/save', (req, res) => {
  if (req.session.user && req.session.admin) {
    controllers.save(req, res);
  } else if (req.session.user) {
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

router.post('/update/:id', (req, res) => {
  if (req.session.user && req.session.admin) {
    controllers.update(req, res);
  } else if (req.session.user) {
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

router.post('/delete', (req, res) => {
  if (req.session.user && req.session.admin) {
    controllers.delete(req, res);
  } else if (req.session.user) {
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;