const UserProfile = require('../../models/user-profile.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const searchNewConnections = async (req, res) => {
  try {
    const name = new RegExp('.*' + req.body.searchName + '.*');

    const userConnections = await UserProfile.aggregate([
      {
        $match: {
          name,
        },
      },
      { $project: { _id: 1, name: 1, email: 1, userImageURL: 1 } },
      { $addFields: { connectionId: { $toString: _id } } },
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
                      $eq: ['$primaryUser', req.user._id],
                    },
                    {
                      $eq: ['$followedUser', '$$connectionId'],
                    },
                  ],
                },
              },
            },
            {
              $cond: {
                if: {
                  $eq: ['$status', 'following'],
                },
                then: 'following',
                else: {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ['$primaryUser', '$$connectionId'],
                        },
                        {
                          $eq: ['$followedUser', req.user._id],
                        },
                      ],
                    },
                  },
                },
              },
            },
          ],
          as: 'connection',
        },
      },
    ]);

    responseHandler(userConnections, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = searchNewConnections;
