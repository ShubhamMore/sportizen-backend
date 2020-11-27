const mongoose = require('mongoose');

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

userConnectionSchema.methods.toJSON = function () {
  const userConnection = this;
  const userConnectionObject = userConnection.toObject();

  delete userConnectionObject.__v;

  return userConnectionObject;
};

const UserConnection = mongoose.model('UserConnection', userConnectionSchema);

module.exports = UserConnection;
