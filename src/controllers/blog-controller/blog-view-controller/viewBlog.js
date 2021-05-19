const Blog = require('../../../models/blog-model/blog.model');

const errorHandler = require('../../../handlers/error.handler');
const responseHandler = require('../../../handlers/response.handler');

const viewBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      {
        _id: req.body.blog,
      },
      {
        $inc: { blogViews: 1 },
      }
    );

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = viewBlog;
