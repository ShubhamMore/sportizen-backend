const Blog = require('../../models/blog-model/blog.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const awsUploadFiles = require('../../uploads/awsUploadFiles');

const newBlog = async (req, res) => {
  try {
    const file = req.files;
    const images = new Array();

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

    const blogData = {
      title: req.body.title,
      sport: req.body.sport,
      subtitle: req.body.subtitle,
      description: req.body.description,
      createdBy: req.user.sportizenId,
      images,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    };

    const blog = new Blog(blogData);

    await blog.save();

    responseHandler(blog, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = newBlog;
