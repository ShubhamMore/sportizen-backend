const Blog = require('../../models/blog-model');
const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const addBookmark = async (req, res) => {
  try {
    const blog = await Blog.updateOne(
      { _id: req.body.blogId },
      {
        $addToSet: {
          bookmark: req.body.sportizenId,
        },
      }
    );
    responseHandler(blog, 200, res);
  } catch (error) {
    console.log(error);
    errorHandler(error, 400, res);
  }
};

module.exports = addBookmark;
