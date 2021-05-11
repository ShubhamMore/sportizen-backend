const UserProfile = require('../../models/user-model/user-profile.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getMyProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.aggregate([
      {
        $match: { sportizenId: req.user.sportizenId },
      },

      {
        $lookup: {
          from: 'userconnections',
          let: {},
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$followedUser', req.user.sportizenId] },
                    { $eq: ['$status', 'following'] },
                  ],
                },
              },
            },
            { $count: 'followersCount' },
          ],
          as: 'followers',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$followers', 0] }, '$$ROOT'] },
        },
      },
      {
        $lookup: {
          from: 'userconnections',
          let: {},
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$primaryUser', req.user.sportizenId] },
                    { $eq: ['$status', 'following'] },
                  ],
                },
              },
            },
            { $count: 'followingsCount' },
          ],
          as: 'followings',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$followings', 0] }, '$$ROOT'] },
        },
      },
      {
        $project: { followings: 0, followers: 0 },
      },
    ]);

    if (!userProfile[0]) {
      throw new Error('Profile Not Found');
    }

    responseHandler(userProfile[0], 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = getMyProfile;
