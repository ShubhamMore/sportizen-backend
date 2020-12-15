const mongoose = require('mongoose');
const validator = require('validator');

const postViewSchema = new mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  sportizenUser: {
    type: String,
    required: true,
  },
  postView: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

postViewSchema.methods.toJSON = function () {
  const postView = this;
  const postViewObject = postView.toObject();

  delete postViewObject.__v;

  return postViewObject;
};

const PostView = mongoose.model('PostView', postViewSchema);

module.exports = PostView;
