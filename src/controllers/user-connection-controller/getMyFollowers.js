const UserConnection = require('../../models/user-connection.model');

const mongoose = require('mongoose');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getMyFollowers = async (req, res) => {
  try {
    const myFollowers = await UserConnection.aggregate([
      {
        $match: {
          followedUser: req.user.sportizenId,
          status: 'following',
        },
      },
      {
        $addFields: {
          searchUser: {
            $toObjectId: '$primaryUser',
          },
        },
      },
      {
        $lookup: {
          from: 'userprofiles',
          localField: 'searchUser',
          foreignField: 'sportizenId',
          as: 'connectionDetails',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$connectionDetails', 0] }, '$$ROOT'] },
        },
      },
      { $project: { connectionDetails: 0 } },
      { $project: { _id: 1, email: 1, name: 1, userImageURL: 1, userCoverImageURL: 1 } },
    ]);

    responseHandler(myFollowers, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getMyFollowers;
