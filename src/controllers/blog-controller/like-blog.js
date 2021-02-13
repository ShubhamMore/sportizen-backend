const Blog = require('../../models/blog-model/blog-model');

const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.body.blog, {
      $addToSet: {
        likedBy: req.user.sportizenId,
      },
    });

<<<<<<< HEAD
    const blogUpdate = await Blog.update(
      {
        _id: req.body.blogId,
      },
      {
        $addToSet: {
          likes: req.user.sportizenId,
        },
      }
    );
=======
    if (!blog) {
      throw new Error("Blog doesn't Exists");
    }
>>>>>>> 4a55c482a9d9067cff35dcf2cd1c1a13c0a6c15b

    responseHandler({ success: true }, 200, res);
  } catch (error) {
    errorHandler(error, 400, res);
  }
};

module.exports = likeBlog;
