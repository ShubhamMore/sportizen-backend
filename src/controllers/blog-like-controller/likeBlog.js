const BlogLike = require('../../models/blog-model/blog-like.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const likeBlog = async (req, res) => {
  try {
    let blogLike = await BlogLike.findOne({
      blog: req.body.blog,
      sportizenUser: req.user.sportizenId,
    });

    if (!blogLike) {
      blogLike = new BlogLike({
        blog: req.body.blog,
        sportizenUser: req.user.sportizenId,
        createdAt: new Date().toISOString(),
      });

      await blogLike.save();
    }

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = likeBlog;

// const Blog = require('../../models/blog-model/blog-model');

// const responseHandler = require('../../handlers/response.handler');
// const errorHandler = require('../../handlers/error.handler');

// const likeBlog = async (req, res) => {
//   try {
//     const blog = await Blog.findByIdAndUpdate(req.body.blog, {
//       $addToSet: {
//         likedBy: req.user.sportizenId,
//       },
//     });

//     if (!blog) {
//       throw new Error("Blog doesn't Exists");
//     }

//     responseHandler({ success: true }, 200, req, res);
//   } catch (error) {
//     errorHandler(error, 400, req, res);
//   }
// };

// module.exports = likeBlog;
