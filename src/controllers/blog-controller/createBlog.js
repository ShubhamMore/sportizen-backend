const Blog = require('../../models/blog-model/blog.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const awsUploadFiles = require('../../uploads/awsUploadFiles');

const newBlog = async (req, res) => {
  try {
    const file = req.files;

    const tags = req.body.tags.split('-');

    if (tags.length > 5) {
      throw new Error('Maximum 5 tags are Allowed');
    }

    let image = {
      imageName: null,
      secureUrl: null,
      publicId: null,
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
        for (let i = 0; i < uploadResLen; i++) {
          image = {
            imageName: uploadRes[i].key,
            secureUrl: uploadRes[i].Location,
            publicId: uploadRes[i].key,
          };
        }
      }
    }

    const blogData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      tags,
      description: req.body.description,
      ...image,
      sportizenUser: req.user.sportizenId,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    };

    const blog = new Blog(blogData);

    await blog.save();

    responseHandler(blog, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = newBlog;
