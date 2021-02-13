const mongoose = require('mongoose');
const validator = require('validator');

const commentSchema = new mongoose.Schema({
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

commentSchema.methods.toJSON = function () {
  const comment = this;
  const commentObject = comment.toObject();

  delete commentObject.__v;

  return commentObject;
};

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
