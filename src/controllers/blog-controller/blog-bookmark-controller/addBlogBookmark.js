const BookmarkBlog = require('../../../models/blog-model/bookmark-blog.model');

const errorHandler = require('../../../handlers/error.handler');
const responseHandler = require('../../../handlers/response.handler');

const addBlogBookmark = async (req, res) => {
  try {
    let bookmarkBlog = await BookmarkBlog.findOne({
      blog: req.body.blog,
      sportizenUser: req.user.sportizenId,
    });

    if (!bookmarkBlog) {
      bookmarkBlog = new BookmarkBlog({
        blog: req.body.blog,
        sportizenUser: req.user.sportizenId,
        createdAt: new Date().toISOString(),
      });

      await bookmarkBlog.save();
    }

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = addBlogBookmark;
