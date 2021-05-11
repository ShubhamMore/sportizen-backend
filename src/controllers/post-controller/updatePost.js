const Post = require('../../models/post-model/post.model');

const awsUploadFile = require('../../uploads/awsUploadFile');
const awsRemoveFile = require('../../uploads/awsRemoveFile');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const updatePost = async (req, res) => {
  try {
    const file = req.file;

    const post = await Post.findById(req.body._id);

    if (!post) {
      throw new Error('Post Not Found');
    }

    const postFile = {
      fileName: post.fileName,
      secureUrl: post.secureUrl,
      publicId: post.publicId,
    };

    if (file !== undefined) {
      const filePath = file.path;
      const fileName = file.filename;

      const cloudDirectory = 'post';
      const uploadResponce = await awsUploadFile(filePath, fileName, cloudDirectory);

      const uploadRes = uploadResponce.upload_res;
      if (uploadRes) {
        if (postFile.publicId) {
          await awsRemoveFile(postFile.publicId);
        }

        postFile.fileName = uploadRes.key;
        postFile.secureUrl = uploadRes.Location;
        postFile.publicId = uploadRes.key;
      }
    }

    const updatedPost = {
      sportizenUser: req.user.sportizenId,
      postType: req.body.postType,
      description: req.body.description,
      fileName: postFile.fileName,
      secureUrl: postFile.secureUrl,
      publicId: postFile.publicId,
      visibility: req.body.visibility,
      modifiedAt: new Date().toISOString(),
    };

    await Post.findByIdAndUpdate(req.body._id, updatedPost);

    responseHandler(post, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = updatePost;
