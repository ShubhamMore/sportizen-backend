const PostLike = require('../../models/post-model/post-like.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getPostLikes = async (req, res) => {
  try {
    const query = [
      {
        $match: {
          post: req.body.post,
        },
      },
      {
        $sort: { _id: -1 },
      },
    ];

    if (req.body.skip) {
      query.push({
        $skip: req.body.skip,
      });
    }

    if (req.body.limit) {
      query.push({
        $limit: req.body.limit,
      });
    }

    const postLikes = await PostLike.aggregate([
      ...query,
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

    responseHandler(postLikes, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = getPostLikes;
