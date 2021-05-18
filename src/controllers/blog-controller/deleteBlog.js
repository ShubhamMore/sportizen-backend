const Blog = require('../../models/blog-model/blog.model');
const BlogLike = require('../../models/blog-model/blog-like.model');
const BlogView = require('../../models/blog-model/blog-view.model');
const BookmarkBlog = require('../../models/blog-model/bookmark-blog.model');
const BlogComment = require('../../models/blog-model/blog-comment.model');
const BlogCommentLike = require('../../models/blog-model/blog-comment-like.model');

const awsRemoveFile = require('../../uploads/awsRemoveFile');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.body.id);

    if (!blog) {
      throw new Error('Blog Not Found');
    }

    if (blog.sportizenUser !== req.user.sportizenId) {
      throw new Error('You are not authorized user to delete this Blog');
    }

    if (blog.publicId) {
      await awsRemoveFile(blog.publicId);
    }

    const deleteBlog = Blog.findByIdAndDelete(req.body.id);
    const blogLike = BlogLike.deleteMany({ blog: req.body.id });
    const blogView = BlogView.deleteMany({ blog: req.body.id });
    const bookmarkBlog = BookmarkBlog.deleteMany({ blog: req.body.id });
    const blogComment = BlogComment.deleteMany({ blog: req.body.id });
    const blogCommentLike = BlogCommentLike.deleteMany({ blog: req.body.id });

    Promise.all([deleteBlog, blogLike, blogView, bookmarkBlog, blogComment, blogCommentLike])
      .then((resData) => {
        responseHandler({ success: true }, 200, req, res);
      })
      .catch((e) => {
        throw new Error(e);
      });
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = deleteBlog;
