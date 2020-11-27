const PostLike = require('../../models/post-like.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const likePost = async (req, res) => {
  try {
    let postLike = await PostLike.findOne({
      post: req.body.post,
      sportizenUser: req.user.sportizenId,
    });

    if (!postLike) {
      postLike = new PostLike({
        post: req.body.post,
        sportizenUser: req.user.sportizenId,
      });

      await postLike.save();
    }

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = likePost;
