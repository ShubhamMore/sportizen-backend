const PostView = require('../../models/post-view.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const viewPost = async (req, res) => {
  try {
    let postView = await PostView.findOne({
      post: req.body.post,
      sportizenUser: req.user.sportizenId,
    });

    if (!postView) {
      postView = new PostView({
        post: req.body.post,
        sportizenUser: req.user.sportizenId,
      });

      await postView.save();
    }

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = viewPost;
