const bookmarkBlog = require('../../models/blog-model/bookmark-blog.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const removeBlogBookmark = async (req, res) => {
  try {
    const bookmarkBlog = await BookmarkBlog.findOneAndDelete({
      blog: req.body.blog,
      sportizenUser: req.user.sportizenId,
    });

    if (!bookmarkBlog) {
      throw new Error('Blog bookmark not found');
    }

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = removeBlogBookmark;
