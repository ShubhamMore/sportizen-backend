const UserConnection = require('../../models/user-connection-model/user-connection.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getMyFollowers = async (req, res) => {
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
      query.push({ limit: req.body.limit });
    }

    const myFollowings = await UserConnection.aggregate([
      ...query,
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
              $project: {
                name: 1,
                sportizenId: 1,
                userImageURL: 1,
                mutuleConnections: {
                  $size: '$connections',
                },
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
    ]);

    responseHandler(myFollowings, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getMyFollowers;
