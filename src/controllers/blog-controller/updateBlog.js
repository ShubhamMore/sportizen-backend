const Blog = require('../../models/blog-model/blog.model');

const awsUploadFiles = require('../../uploads/awsUploadFiles');
const awsRemoveFile = require('../../uploads/awsRemoveFile');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const editBlog = async (req, res) => {
  try {
    const file = req.files;

    const tags = req.body.tags.split('-');

    if (tags.length > 5) {
      throw new Error('Maximum 5 tags are Allowed');
    }

    const blog = await Blog.findById(req.body._id);

    let image = {
      imageName: blog.imageName,
      secureUrl: blog.secureUrl,
      publicId: blog.publicId,
    };

    if (file && file.length > 0) {
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
        if (image.publicId) {
          await awsRemoveFile(image.publicId);
        }

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
    blog.tags = tags;
    blog.sport = req.body.sport;
    blog.description = req.body.description;
    blog.imageName = image.imageName;
    blog.secureUrl = image.secureUrl;
    blog.publicId = image.publicId;
    blog.modifiedAt = Date.now();

    await Blog.findByIdAndUpdate(blog._id, blog);

    responseHandler(blog, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = editBlog;
