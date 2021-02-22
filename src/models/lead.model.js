const mongoose = require('mongoose');
const validator = require('validator');

const leadSchema = new mongoose.Schema({
  emailid: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
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

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
