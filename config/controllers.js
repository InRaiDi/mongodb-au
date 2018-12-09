var Computer = require('../models/computers.js');
var controller = {};

controller.list = (req, res) => {
  Computer.find({}, (err, computers) => {
    res.render('index', {
      computers: computers
    })
  });
}

controller.show = (req, res) => {
  Computer.findOne({
    _id: req.params.id
  }).exec(function (err, computer) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("edit", {
        computer: computer
      })
    }
  });
}

controller.save = (req, res) => {
  const computerData = new Computer(req.body);
  computerData.save().then(result => {
    res.redirect('/');
  }).catch(err => {
    console.log(err);
  });
}

controller.update = (req, res) => {
  Computer.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, function(err, user) {
    if (err) console.warn(err);
    res.redirect('/');
  });
}

controller.delete = (req, res) => {
  Computer.deleteOne({ _id: req.body._id }, function(err){
    if (!err) {
      res.redirect('/');
    }
    else {
      console.log(err);
    }
  });
}

module.exports = controller;