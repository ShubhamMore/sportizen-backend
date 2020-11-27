const mongoose = require('mongoose');
const validator = require('validator');

const savePostSchema = new mongoose.Schema({
  post: {
    type: String,
    required: true,
  },
  sportizenUser: {
    type: String,
    required: true,
  },
  savePost: {
    type: Boolean,
    default: true,
  },
});

savePostSchema.methods.toJSON = function () {
  const savePost = this;
  const savePostObject = savePost.toObject();

  delete savePostObject.__v;

  return savePostObject;
};

const SavePost = mongoose.model('SavePost', savePostSchema);

module.exports = SavePost;
