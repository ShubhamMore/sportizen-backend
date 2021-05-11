const Blog = require('../../models/blog-model/blog.model');

const awsUploadFiles = require('../../uploads/awsUploadFiles');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const editBlog = async (req, res) => {
  try {
    const file = req.files;

    const blog = await Blog.findById(req.body._id);

    const images = blog.images;

    if (file.length > 0 && file !== undefined) {
      let filePaths = new Array();
      let fileNames = new Array();

      const n = file.length;

      for (let i = 0; i < n; i++) {
        filePaths.push(file[i].path);
        fileNames.push(file[i].filename);
      }

      const cloudDirectory = 'blogs';
      const uploadResponce = await awsUploadFiles(filePaths, fileNames, cloudDirectory);

      const uploadRes = uploadResponce.uploadRes;
      const uploadResLen = uploadRes.length;

      if (uploadResLen > 0) {
        for (let i = 0; i < uploadResLen; i++) {
          const image = {
            imageName: uploadRes[i].key,
            secureUrl: uploadRes[i].Location,
            publicId: uploadRes[i].key,
            createdAt: Date.now(),
          };
          images.push(image);
        }
      }
    }

    blog.title = req.body.title;
    blog.sport = req.body.sport;
    blog.subtitle = req.body.subtitle;
    blog.description = req.body.description;
    blog.createdBy = req.user.sportizenId;
    blog.images = images;
    blog.modifiedAt = Date.now();

    await Blog.findByIdAndUpdate(blog._id, blog);

    responseHandler(blog, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = editBlog;
