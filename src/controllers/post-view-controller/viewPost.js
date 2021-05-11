const PostView = require('../../models/post-model/post-view.model');

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
        createdAt: new Date().toISOString(),
      });

      await postView.save();
    }

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = viewPost;
