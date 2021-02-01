const Blog = require('../../models/blog-model/blog-model');
const responseHandler = require('../../handlers/response.handler');
const errorHandler = require('../../handlers/error.handler');

const awsUploadFiles = require('../../uploads/awsUploadFiles');

const createBlog = async (req, res) => {
  try {
    const file = req.files;
    const images = new Array();

    if (file !== undefined) {
      let filePaths = new Array();
      let fileNames = new Array();

      const n = file.length;

      for (let i = 0; i < n; i++) {
        filePaths.push(file[i].path);
        fileNames.push(file[i].filename);
      }

      const cloudDirectory = 'blogs';
      const uploadResponce = await awsUploadFiles(filePaths, fileNames, cloudDirectory);

      const uploadRes = uploadResponce.upload_res;
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
      sportizenUser: req.user.sportizenId,
      blogTitle: req.body.blogTitle,
      blogSubtitle: req.body.blogSubtitle,
      blogDescription: req.body.blogDescription,
      viewTime: req.body.viewTime,
      tags: req.body.tags,
      images: images,
    };

    const blog = new Blog(blogData);

    await blog.save();

    responseHandler(blog, 200, res);
  } catch (error) {
    errorHandler(error, 400, res);
  }
};

module.exports = createBlog;
