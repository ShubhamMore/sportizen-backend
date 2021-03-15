const UserConnection = require('../../models/user-connection-model/user-connection.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getUserFollowings = async (req, res) => {
  try {
    const query = [
      {
        $match: {
          primaryUser: req.body.user,
          status: 'following',
        },
      },
    ];

    if (req.body.limit) {
      query.push({ limit: req.body.limit });
    }

    const userFollowings = await UserConnection.aggregate([
      ...query,
      {
        $project: { status: 0 },
      },
      {
        $lookup: {
          from: 'userprofiles',
          let: { searchUser: '$followedUser' },
          pipeline: [
            { $match: { $expr: { $eq: ['$sportizenId', '$$searchUser'] } } },
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
                let: { searchUser: '$$searchUser' },
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
          ],
          as: 'connectionDetails',
        },
      },
      { $project: { _id: 0, connectionDetails: 1 } },

      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$connectionDetails', 0] }, '$$ROOT'] },
        },
      },
      {
        $project: {
          connectionDetails: 0,
        },
      },
      {
        $sort: {
          connectionStatus: -1,
        },
      },
    ]);

    responseHandler(userFollowings, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getUserFollowings;
