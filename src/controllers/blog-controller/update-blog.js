const Blog = require('../../models/blog-model');
const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.body.blogId });
    if (!blog) {
      throw new Error('Blog Not Found');
    }
    await Blog.updateOne(
      {
        _id: req.body.blogId,
      },
      {
        blogTitle: req.body.blogTitle,
        blogSubtitle: req.body.blogSubtitle,
        blogDescription: req.body.blogDescription,
      }
    );
    responseHandler({ msg: 'Blog is updated' }, 200, res);
  } catch (error) {
    errorHandler(error, 400, res);
  }
};

module.exports = updateBlog;
