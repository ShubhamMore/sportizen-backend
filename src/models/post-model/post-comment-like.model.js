const mongoose = require('mongoose');
const validator = require('validator');

const postCommentLikeSchema = new mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  sportizenUser: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  commentLike: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

postCommentLikeSchema.methods.toJSON = function () {
  const postCommentLike = this;
  const postCommentLikeObject = postCommentLike.toObject();

  delete postCommentLikeObject.__v;

  return postCommentLikeObject;
};

const PostCommentLike = mongoose.model('PostCommentLike', postCommentLikeSchema);

module.exports = PostCommentLike;
