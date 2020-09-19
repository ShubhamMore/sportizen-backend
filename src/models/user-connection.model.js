const mongoose = require('mongoose');
const validator = require('validator');

const userConnectionSchema = new mongoose.Schema({
  firstUser: {
    type: String,
    required: true,
  },
  secondUser: {
    type: String,
    required: true,
  },
  status: {
    type: String, // Requested, Canceled, Rejected, Blocked, Removed, Connected
    require: true,
  },
  actionedUser: {
    type: String,
    required: true,
  },
});

const UserConnection = mongoose.model('UserConnection', userConnectionSchema);

module.exports = UserConnection;
