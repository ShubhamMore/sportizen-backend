const Post = require('../../models/post.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const sharePost = async (req, res) => {
  try {
    const sharedPost = {
      sportizenUser: req.user.sportizenId,
      postType: 'shared',
      sharedPost: req.body.post,
      description: req.body.description ? req.body.description : null,
      filename: null,
      secureUrl: null,
      publicId: null,
      visibility: req.body.visibility,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    };

    const post = new Post(sharedPost);

    await post.save();

    responseHandler(post, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = sharePost;
