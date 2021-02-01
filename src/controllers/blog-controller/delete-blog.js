const Blog = require('../../models/blog-model/blog-model');
const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.body.blog);

    if (!blog) {
      throw new Error("Blog doesn't Exists");
    }

    responseHandler({ success: true }, 200, res);
  } catch (error) {
    errorHandler(error, 400, res);
  }
};

module.exports = deleteBlog;
