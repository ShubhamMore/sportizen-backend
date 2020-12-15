const PostView = require('../../models/post-view.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getPostViews = async (req, res) => {
  try {
    const postViews = await PostView.aggregate([
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
                profileImageUrl: 1,
              },
            },
          ],
          as: 'postViewUsers',
        },
      },
      {
        $project: {
          post: 0,
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$postViewUsers', 0] }, '$$ROOT'] },
        },
      },
      { $project: { postViewUsers: 0, sportizenUser: 0 } },
    ]);

    responseHandler(postViews, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getPostViews;
