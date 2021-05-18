const mongoose = require('mongoose');
const validator = require('validator');

const blogCommentSchema = new mongoose.Schema({
  blog: {
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

blogCommentSchema.methods.toJSON = function () {
  const comment = this;
  const commentObject = comment.toObject();

  delete commentObject.__v;

  return commentObject;
};

const BlogComment = mongoose.model('BlogComment', blogCommentSchema);

module.exports = BlogComment;
