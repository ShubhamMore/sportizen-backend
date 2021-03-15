const Post = require('../../models/post-model/post.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getUserPostGallery = async (req, res) => {
  try {
    const query = [
      {
        $match: {
          sportizenUser: req.body.user,
          postType: 'image',
        },
      },
    ];

    if (req.body.limit) {
      query.push({ $limit: req.body.limit });
    }

    const postGallery = await Post.aggregate([
      ...query,
      {
        $project: {
          secureUrl: 1,
        },
      },
    ]);

    responseHandler(postGallery, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getUserPostGallery;
