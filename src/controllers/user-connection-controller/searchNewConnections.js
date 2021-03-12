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
      { $project: { _id: 1, name: 1, email: 1, userImageURL: 1, sportizenId: 1 } },
      {
        $lookup: {
          from: 'userconnections',
          let: { searchUser: '$sportizenId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    {
                      $and: [
                        { $eq: ['$primaryUser', '$$searchUser'] },
                        { $eq: ['$followedUser', req.user.sportizenId] },
                        { $eq: ['$status', 'following'] },
                      ],
                    },
                    {
                      $and: [
                        { $eq: ['$followedUser', '$$searchUser'] },
                        { $eq: ['$primaryUser', req.user.sportizenId] },
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
      {
        $addFields: {
          connectionStatus: '$status',
        },
      },
      { $project: { followers: 0, status: 0 } },
    ]);

    responseHandler(userConnections, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = searchNewConnections;
