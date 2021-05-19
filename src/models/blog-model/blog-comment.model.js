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
  const blogComment = this;
  const blogCommentObject = blogComment.toObject();

  delete blogCommentObject.__v;

  return blogCommentObject;
};

const BlogComment = mongoose.model('BlogComment', blogCommentSchema);

module.exports = BlogComment;
