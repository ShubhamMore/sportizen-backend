const mongoose = require('mongoose');
const validator = require('validator');

const postCommentSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

postCommentSchema.methods.toJSON = function () {
  const postComment = this;
  const postCommentObject = postComment.toObject();

  delete postCommentObject.__v;

  return postCommentObject;
};

const PostComment = mongoose.model('PostComment', postCommentSchema);

module.exports = PostComment;
