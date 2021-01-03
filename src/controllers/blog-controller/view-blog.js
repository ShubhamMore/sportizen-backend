const Blog = require('../../models/blog-model');
const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

//const awsUploadFiles = require('../../uploads/awsUploadFiles');
const viewBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.body.blogId });
    responseHandler(blog, 200, res);
  } catch (error) {
    console.log(error);
    errorHandler(error, 400, res);
  }
};

module.exports = viewBlog;
