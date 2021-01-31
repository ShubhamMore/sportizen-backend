const Blog = require('../../models/blog-model');
const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const deleteBlog = async (req, res) => {
  try {
    const myBlogs = await Blog.find({
      _id: req.user.blogId,
    });

    
    responseHandler(myBlogs, 200, res);
  } catch (error) {
    console.log(error);
    errorHandler(error, 400, res);
  }
};

module.exports = deleteBlog;
