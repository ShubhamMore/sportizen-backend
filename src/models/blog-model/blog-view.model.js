const mongoose = require('mongoose');
const validator = require('validator');

const blogViewSchema = new mongoose.Schema({
  blog: {
    type: String,
    required: true,
  },
  sportizenUser: {
    type: String,
    required: true,
  },
  blogView: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

blogViewSchema.methods.toJSON = function () {
  const blogView = this;
  const blogViewObject = blogView.toObject();

  delete blogViewObject.__v;

  return blogViewObject;
};

const BlogView = mongoose.model('BlogView', blogViewSchema);

module.exports = BlogView;
