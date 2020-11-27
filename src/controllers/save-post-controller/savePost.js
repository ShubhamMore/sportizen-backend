const SavePost = require('../../models/save-post.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const savePost = async (req, res) => {
  try {
    let savePost = await SavePost.findOne({
      post: req.body.post,
      sportizenUser: req.user.sportizenId,
    });

    if (!savePost) {
      savePost = new SavePost({
        post: req.body.post,
        sportizenUser: req.user.sportizenId,
      });

      await savePost.save();
    }

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = savePost;
