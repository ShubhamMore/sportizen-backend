const mongoose = require('mongoose');
const validator = require('validator');

const likeSchema = new mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  sportizenUser: {
    type: String,
    required: true,
  },
  like: {
    type: Boolean,
    default: true,
  },
});

likeSchema.methods.toJSON = function () {
  const like = this;
  const likeObject = like.toObject();

  delete likeObject.__v;

  return likeObject;
};

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
