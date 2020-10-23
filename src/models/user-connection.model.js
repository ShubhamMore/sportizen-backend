const mongoose = require('mongoose');
const validator = require('validator');

const userConnectionSchema = new mongoose.Schema({
  primaryUser: {
    type: String,
    required: true,
  },
  followedUser: {
    type: String,
    required: true,
  },
  status: {
    type: String, // Requested, Rejected, Blocked, Following
    require: true,
  },
});

const UserConnection = mongoose.model('UserConnection', userConnectionSchema);

module.exports = UserConnection;
