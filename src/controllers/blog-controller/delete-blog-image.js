const Blog = require('../../models/blog-model/blog.model');
const awsRemoveFile = require('../../uploads/awsRemoveFile');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deleteBlogImage = async (req, res) => {
  try {
    const id = req.body.id;
    const imageId = req.body.imageId;
    let i = req.body.index;

    const blog = await Blog.findById(id);

    if (!blog) {
      throw new Error();
    }

    if (blog.images[i]._id != imageId) {
      i = blog.images.findIndex((image) => image._id == imageId);
    }

    const publicId = blog.images[i].publicId;

    await awsRemoveFile(publicId);

    blog.images.splice(i, 1);

    await Blog.findByIdAndUpdate(id, blog);

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = deleteBlogImage;
