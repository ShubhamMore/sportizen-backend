const UserProfile = require('../../models/user-model/user-profile.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const searchNewConnections = async (req, res) => {
  try {
    const searchName = req.body.searchName ? req.body.searchName.toLowerCase() : '';

    const name = new RegExp('^' + searchName + '.*');

    // const userConnections = await UserProfile.aggregate([{ $match: { name } }]);

    const query = [
      {
        $match: {
          name,
          sportizenId: { $ne: req.user.sportizenId },
        },
      },
    ];

    if (req.body.limit) {
      query.push({
        $limit: 6,
      });
    }

    const userConnections = await UserProfile.aggregate([
      ...query,
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
            {
              $project: {
                _id: 0,
                searchUser: '$followedUser',
              },
            },
          ],
          as: 'myFollowings',
        },
      },
      {
        $lookup: {
          from: 'userconnections',
          let: { searchUser: '$sportizenId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$followedUser', '$$searchUser'] },
                    { $eq: ['$status', 'following'] },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 0,
                searchUser: '$primaryUser',
              },
            },
          ],
          as: 'userFollowers',
        },
      },
      {
        $addFields: {
          connections: { $setIntersection: ['$myFollowings', '$userFollowers'] },
        },
      },
      {
        $lookup: {
          from: 'userconnections',
          let: { searchUser: '$sportizenId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$primaryUser', req.user.sportizenId],
                    },
                    {
                      $eq: ['$followedUser', '$$searchUser'],
                    },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 0,
                status: 1,
              },
            },
          ],
          as: 'connectionStatus',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$connectionStatus', 0] }, '$$ROOT'] },
        },
      },
      {
        $project: {
          name: 1,
          sportizenId: 1,
          userImageURL: 1,
          mutuleConnections: {
            $size: '$connections',
          },
          connectionStatus: '$status',
        },
      },
    ]);

    responseHandler(userConnections, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = searchNewConnections;
