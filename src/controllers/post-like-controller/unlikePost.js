const PostLike = require('../../models/post-model/post-like.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const unlikePost = async (req, res) => {
  try {
    const postLike = await PostLike.findOneAndDelete({
      post: req.body.post,
      sportizenUser: req.user.sportizenId,
    });

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = unlikePost;
