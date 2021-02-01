const Blog = require('../../models/blog-model/blog-model');
const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const viewBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.body.blog);

    if (!blog) {
      throw new Error("Blog doesn't Exists");
    }

    responseHandler(blog, 200, res);
  } catch (error) {
    errorHandler(error, 400, res);
  }
};

module.exports = viewBlog;
