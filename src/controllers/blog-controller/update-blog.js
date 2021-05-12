const Blog = require('../../models/blog-model/blog.model');

const awsUploadFiles = require('../../uploads/awsUploadFiles');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const editBlog = async (req, res) => {
  try {
    const file = req.files;

    const blog = await Blog.findById(req.body._id);

    let image = blog.image;

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
          image = {
            imageName: uploadRes[i].key,
            secureUrl: uploadRes[i].Location,
            publicId: uploadRes[i].key,
          };
        }
      }
    }

    blog.title = req.body.title;
    blog.subtitle = req.body.subtitle;
    blog.tags = req.body.tags.split('-');
    blog.sport = req.body.sport;
    blog.description = req.body.description;
    blog.imageName = image.imageName;
    blog.secureUrl = image.secureUrl;
    blog.publicId = image.publicId;
    blog.createdBy = req.user.sportizenId;
    blog.modifiedAt = Date.now();

    await Blog.findByIdAndUpdate(blog._id, blog);

    responseHandler(blog, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = editBlog;
