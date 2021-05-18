const BlogLike = require('../../models/blog-model/blog-like.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getBlogLikes = async (req, res) => {
  try {
    const query = [
      {
        $match: {
          blog: req.body.blog,
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

    const blogLikes = await BlogLike.aggregate([
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
          as: 'blogLikeUsers',
        },
      },
      {
        $project: {
          blog: 0,
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$blogLikeUsers', 0] }, '$$ROOT'] },
        },
      },
      { $project: { blogLikeUsers: 0, sportizenUser: 0 } },
    ]);

    responseHandler(blogLikes, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = getBlogLikes;
