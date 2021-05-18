const PostBookmark = require('../../../models/post-model/post-bookmark.model');

const errorHandler = require('../../../handlers/error.handler');
const responseHandler = require('../../../handlers/response.handler');

const removePostBookmark = async (req, res) => {
  try {
    const postBookmark = await PostBookmark.findOneAndDelete({
      post: req.body.post,
      sportizenUser: req.user.sportizenId,
    });

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = removePostBookmark;
