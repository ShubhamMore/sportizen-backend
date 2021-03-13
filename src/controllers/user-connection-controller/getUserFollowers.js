const UserConnection = require('../../models/user-connection-model/user-connection.model');

const mongoose = require('mongoose');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getUserFollowers = async (req, res) => {
  try {
    const query = [
      {
        $match: {
          followedUser: req.body.user,
          status: 'following',
        },
      },
    ];

    if (req.body.limit) {
      query.push({ limit: req.body.limit });
    }

    const userFollowers = await UserConnection.aggregate([
      ...query,
      {
        $project: { status: 0 },
      },
      {
        $lookup: {
          from: 'userprofiles',
          let: { searchUser: '$primaryUser' },
          pipeline: [
            { $match: { $expr: { $eq: ['$sportizenId', '$$searchUser'] } } },
            {
              $lookup: {
                from: 'userconnections',
                let: { searchUser: '$$searchUser' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $or: [
                          {
                            $and: [
                              { $eq: ['$primaryUser', '$$searchUser'] },
                              { $eq: ['$followedUser', req.body.user] },
                              { $eq: ['$status', 'following'] },
                            ],
                          },
                          {
                            $and: [
                              { $eq: ['$followedUser', '$$searchUser'] },
                              { $eq: ['$primaryUser', req.body.user] },
                              { $eq: ['$status', 'following'] },
                            ],
                          },
                        ],
                      },
                    },
                  },
                  { $count: 'mutuleConnections' },
                ],
                as: 'followers',
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
                newRoot: { $mergeObjects: [{ $arrayElemAt: ['$followers', 0] }, '$$ROOT'] },
              },
            },
            {
              $replaceRoot: {
                newRoot: { $mergeObjects: [{ $arrayElemAt: ['$connectionStatus', 0] }, '$$ROOT'] },
              },
            },
          ],
          as: 'connectionDetails',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$connectionDetails', 0] }, '$$ROOT'] },
        },
      },
      { $project: { connectionDetails: 0, followers: 0, connectionStatus: 0 } },
      {
        $project: {
          _id: 1,
          email: 1,
          name: 1,
          sportizenId: 1,
          userImageURL: 1,
          mutuleConnections: 1,
          connectionStatus: '$status',
        },
      },
      {
        $sort: {
          connectionStatus: -1,
        },
      },
    ]);

    responseHandler(userFollowers, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getUserFollowers;