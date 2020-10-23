const UserConnection = require('../../models/user-connection.model');
const mongoose = require('mongoose');

const getMyFollowings = async (req, res) => {
  try {
    const connData = await UserConnection.aggregate([
      {
        $match: {
          primaryUser: req.user._id,
          status: 'following',
        },
      },
      {
        $addFields: {
          searchUser: {
            $toObjectId: '$followedUser',
          },
        },
      },
      {
        $lookup: {
          from: 'userprofiles',
          localField: 'searchUser',
          foreignField: '_id',
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

    res.send(connData);
  } catch (e) {
    let err = '' + e;
    res.status(400).send(err.replace('Error: ', ''));
  }
};

module.exports = getMyFollowings;
