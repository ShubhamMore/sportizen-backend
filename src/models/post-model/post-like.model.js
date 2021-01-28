const mongoose = require('mongoose');
const validator = require('validator');

const postLikeSchema = new mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  sportizenUser: {
    type: String,
    required: true,
  },
  postLike: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

postLikeSchema.methods.toJSON = function () {
  const postLike = this;
  const postLikeObject = postLike.toObject();

  delete postLikeObject.__v;

  return postLikeObject;
};

const PostLike = mongoose.model('PostLike', postLikeSchema);

module.exports = PostLike;
