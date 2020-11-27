const Post = require('../../models/post.model');
const awsRemoveFile = require('../../uploads/awsRemoveFile');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.body.id);

    if (post.publicId) {
      await awsRemoveFile(post.publicId);
    }

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = deletePost;
