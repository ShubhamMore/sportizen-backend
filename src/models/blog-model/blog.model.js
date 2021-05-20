const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  // tags: [String],
  tags: [{ type: [String], validate: [arrayLimit, 'length of tag exceeds 5'] }],
  description: {
    type: String,
    required: true,
  },
  imageName: {
    type: String, // for image & video
    default: null,
  },
  secureUrl: {
    type: String,
    default: null,
  },
  publicId: {
    type: String,
    default: null,
  },
  sportizenUser: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  modifiedAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  blogViews: {
    type: Number,
    default: 0,
  },

  // viewTime: {
  //   type: Number,
  //   required: true,
  // },

  // views: {
  //   type: Number,
  //   required: true,
  //   default: true,
  // },
  // likes: [{ type: String }],

  // comments: [
  //   {
  //     commentedBy: {
  //       type: String,
  //       required: true,
  //     },
  //     comment: {
  //       type: String,
  //       required: true,
  //     },
  //     commentedAt: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],

  // bookmarkUser: [
  //   {
  //     type: Array,
  //   },
  // ],
});

function arrayLimit(val) {
  // return val.length <= 5;
  return true;
}

blogSchema.methods.toJSON = function () {
  const blog = this;
  const blogObject = blog.toObject();

  delete blogObject.__v;

  return blogObject;
};

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
