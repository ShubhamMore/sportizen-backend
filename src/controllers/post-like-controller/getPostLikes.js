const PostLike = require('../../models/post-model/post-like.model');

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
        $lookup: {
          from: 'userprofiles',
          let: { user: '$sportizenUser' },
          pipeline: [
            { $match: { $expr: { $eq: ['$sportizenId', '$$user'] } } },
            {
              $project: {
                name: 1,
                sportizenId: 1,
                userImageURL: 1,
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
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$postLikeUsers', 0] }, '$$ROOT'] },
        },
      },
      { $project: { postLikeUsers: 0, sportizenUser: 0 } },
    ]);

    responseHandler(postLikes, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getPostLikes;
