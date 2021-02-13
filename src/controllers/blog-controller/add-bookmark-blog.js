const Blog = require('../../models/blog-model/blog-model');
const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const addBookmark = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.body.blog, {
      $addToSet: {
        bookmark: req.body.sportizenId,
      },
    });

    if (!blog) {
      throw new Error("Blog doesn't Exists");
    }

    responseHandler({ success: true }, 200, res);
  } catch (error) {
    console.log(error);
    errorHandler(error, 400, res);
  }
};

module.exports = addBookmark;
