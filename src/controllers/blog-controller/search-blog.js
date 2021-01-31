const Blog = require('../../models/blog-model');
const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const searchBlog = async (req, res) => {
  try {
    const blog = await Blog.find({ $or:[
      {
        blogTitle:{
          $regex:req.body.searchQuery
        }
      }
    ] });
    responseHandler(blog, 200, res);
  } catch (error) {
    console.log(error);
    errorHandler(error, 400, res);
  }
};

module.exports = searchBlog;
