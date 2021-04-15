const mongoose = require('mongoose');
const validator = require('validator');

const logSchema = new mongoose.Schema({
  sportizenId: {
    type: String,
  },
  route: {
    type: String,
  },
  date: {
    type: String,
  },
  institute: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
