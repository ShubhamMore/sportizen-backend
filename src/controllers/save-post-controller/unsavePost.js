const SavePost = require('../../models/post-model/save-post.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const unsavePost = async (req, res) => {
  try {
    const savePost = await SavePost.findOneAndDelete({
      post: req.body.post,
      sportizenUser: req.user.sportizenId,
    });

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = unsavePost;
