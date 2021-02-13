const Blog = require('../../models/blog-model/blog-model');
const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const searchBlog = async (req, res) => {
  try {
    const blogs = await Blog.find({
      $or: [
        {
          blogTitle: {
            $regex: req.body.searchQuery,
          },
        },
      ],
    });

    responseHandler(blogs, 200, res);
  } catch (error) {
    console.log(error);
    errorHandler(error, 400, res);
  }
};

module.exports = searchBlog;
