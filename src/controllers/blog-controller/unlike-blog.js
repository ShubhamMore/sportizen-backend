const Blog = require('../../models/blog-model/blog-model');
const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const unlikeBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.body.blog, {
      $pull: { $in: { likedBy: req.user.sportizenId } },
    });

    if (!blog) {
      throw new Error("Blog doesn't Exists");
    }

    responseHandler(blogUpdate, 200, req, res);
  } catch (error) {
    errorHandler(error, 400, req, res);
  }
};

module.exports = unlikeBlog;
