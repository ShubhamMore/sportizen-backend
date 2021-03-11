const UserProfile = require('../../models/user-model/user-profile.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const searchNewConnections = async (req, res) => {
  try {
    console.log(req.body.searchName);

    const searchName = req.body.searchName ? req.body.searchName.toLowerCase() : '';

    const name = new RegExp('^' + searchName + '.*');

    // const userConnections = await UserProfile.aggregate([{ $match: { name } }]);

    const query = [
      {
        $match: {
          name,
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
      { $addFields: { connectionId: { $toString: '$sportizenId' } } },
      {
        $lookup: {
          from: 'userconnections',
          let: { connectionId: '$connectionId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$primaryUser', req.user.sportizenId],
                    },
                    {
                      $eq: ['$followedUser', '$$connectionId'],
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
          as: 'connection',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$connection', 0] }, '$$ROOT'] },
        },
      },
      {
        $addFields: {
          connectionStatus: '$status',
        },
      },
      { $project: { connection: 0, status: 0 } },
    ]);

    responseHandler(userConnections, 200, res);
  } catch (e) {
    console.log(e);
    errorHandler(e, 400, res);
  }
};

module.exports = searchNewConnections;
