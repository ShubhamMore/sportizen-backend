const Blog = require('../../models/blog-model/blog-model');
const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const getMyBlogs = async (req, res) => {
  try {
    const myBlogs = await Blog.find({
      sportizenUser: req.user.sportizenId,
    });

    responseHandler(myBlogs, 200, res);
  } catch (error) {
    errorHandler(error, 400, res);
  }
};

module.exports = getMyBlogs;
