var mongoose = require('mongoose');

let computerSchema = new mongoose.Schema({
  firm: {
    type: String,
    default: 'none'
  },
  model: {
    type: String,
    default: 'none'
  },
  ram: {
    type: Number,
    default: 0,
    min: 0,
    max: 10000
  },
  os: {
    type: String,
    default: 'none'
  },
  color: {
    type: String,
    default: 'none'
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
    max: 1000000
  }
});

module.exports = mongoose.model('Computer', computerSchema);
