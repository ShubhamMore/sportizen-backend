const PostLike = require('../../models/post-like.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getPostLikes = async (req, res) => {
  try {
    const postLikes = await PostLike.aggregate([
      {
        $match: {
          post: req.body.post,
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $lookup: {
          from: 'userprofiles',
          let: { user: '$sportizenUser' },
          pipeline: [
            { $match: { $expr: { $eq: ['$sportizenId', '$$user'] } } },
            {
              $project: {
                name: 1,
                sportizenId: 1,
                profileImageUrl: 1,
              },
            },
          ],
          as: 'postLikeUsers',
        },
      },
      {
        $project: {
          post: 0,
        },
      },
      {
        $unwind: 'postLikeUsers',
      },
    ]);

    responseHandler(postLikes, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getPostLikes;
