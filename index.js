// Express
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

// Connect mongo
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/node-blog", { useNewUrlParser: true });

// bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Auth
var auth = require('./config/auth');
app.use(auth);


// Routes
var routes = require('./config/routes.js');
app.use('/', routes);

// Server
app.listen(3001, () => {
  console.log('Server listing on 3001');
})