const UserConnection = require('../../models/user-connection-model/user-connection.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getMyConnections = async (req, res) => {
  try {
    const myConnections = await UserConnection.aggregate([
      {
        $match: {
          $or: [
            {
              $and: [{ primaryUser: req.user.sportizenId }, { status: 'following' }],
            },
            {
              $and: [{ followedUser: req.user.sportizenId }, { status: 'following' }],
            },
          ],
        },
      },
      {
        $addFields: {
          searchUser: {
            $cond: {
              if: { $eq: ['$primaryUser', req.user.sportizenId] },
              then: '$followedUser',
              else: '$primaryUser',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          searchUser: 1,
        },
      },
      {
        $group: {
          _id: '$searchUser',
        },
      },
      {
        $lookup: {
          from: 'userprofiles',
          let: { searchUser: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$sportizenId', '$$searchUser'] } } },
            {
              $project: {
                name: 1,
                userImageURL: 1,
                sportizenId: 1,
              },
            },
          ],
          as: 'connections',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$connections', 0] }, '$$ROOT'] },
        },
      },
      { $project: { connections: 0 } },
      {
        $project: {
          _id: 0,
          name: 1,
          userImageURL: 1,
          sportizenId: 1,
        },
      },
      {
        $sort: {
          name: 1,
        },
      },
    ]);

    responseHandler(myConnections, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = getMyConnections;
