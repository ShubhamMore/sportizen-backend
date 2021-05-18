const PostBookmark = require('../../../models/post-model/post-bookmark.model');

const errorHandler = require('../../../handlers/error.handler');
const responseHandler = require('../../../handlers/response.handler');

const addPostBookmark = async (req, res) => {
  try {
    let postBookmark = await PostBookmark.findOne({
      post: req.body.post,
      sportizenUser: req.user.sportizenId,
    });

    if (!postBookmark) {
      postBookmark = new PostBookmark({
        post: req.body.post,
        sportizenUser: req.user.sportizenId,
        createdAt: new Date().toISOString(),
      });

      await postBookmark.save();
    }

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    console.log(e);
    errorHandler(e, 400, req, res);
  }
};

module.exports = addPostBookmark;
