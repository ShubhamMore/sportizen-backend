const UserConnection = require('../../models/user-connection-model/user-connection.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getMyFollowings = async (req, res) => {
  try {
    const query = [
      {
        $match: {
          primaryUser: req.user.sportizenId,
          status: 'following',
        },
      },
    ];

    if (req.body.limit) {
      query.push({ $limit: req.body.limit });
    }

    const myFollowingsCount = UserConnection.find(query[0].$match).count();

    const myFollowings = UserConnection.aggregate([
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
                as: 'userFollowings',
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
                connections: { $setIntersection: ['$userFollowings', '$userFollowers'] },
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

    Promise.all([myFollowingsCount, myFollowings])
      .then((resData) => {
        responseHandler({ connectionCount: resData[0], connections: resData[1] }, 200, res);
      })
      .catch((e) => {
        throw new Error(e);
      });
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getMyFollowings;
