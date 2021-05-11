const Blog = require('../../models/blog-model/blog.model');

const awsRemoveFile = require('../../uploads/awsRemoveFile');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndRemove(req.body.id);

    if (!blog) {
      throw new Error('Blog Not Found');
    }

    await blog.images.forEach(async (image) => {
      await awsRemoveFile(image.publicId);
    });

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = deleteBlog;
