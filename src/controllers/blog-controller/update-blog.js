const Blog = require('../../models/blog-model/blog-model');
const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.body.blogId, {
      blogTitle: req.body.blogTitle,
      blogSubtitle: req.body.blogSubtitle,
      blogDescription: req.body.blogDescription,
    });

    if (!blog) {
      throw new Error('Blog Not Found');
    }

    responseHandler({ msg: 'Blog is updated' }, 200, res);
  } catch (error) {
    errorHandler(error, 400, res);
  }
};

module.exports = updateBlog;
