const Event = require('../../models/event-model/event.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getAllEvents = async (req, res) => {
  try {
    const query = [
      {
        $match: {},
      },
      {
        $sort: { _id: -1 },
      },
    ];

    // if (req.body.longitude && req.body.latitude) {
    //   query[0].$match = {
    //     location: {
    //       $geoWithin: { $centerSphere: [[req.body.latitude, req.body.longitude], 100 / 3963.2] },
    //       // 10 Miles of Radius, The query converts the distance to radians by dividing by the approximate equatorial radius of the earth, 3963.2 miles
    //     },
    //   };
    // }

    if (req.body.skip) {
      query.push({
        $skip: req.body.skip,
      });
    }

    if (req.body.limit) {
      query.push({
        $limit: req.body.limit,
      });
    }

    const events = await Event.aggregate([
      ...query,
      {
        $addFields: {
          event: { $toString: '$_id' },
        },
      },
      {
        $lookup: {
          from: 'eventregisteredplayers',
          let: { eventId: '$event' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$event', '$$eventId'],
                },
              },
            },
            {
              $lookup: {
                from: 'userprofiles',
                let: { sportizenUser: '$sportizenUser' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ['$sportizenId', '$$sportizenUser'],
                      },
                    },
                  },
                  {
                    $project: {
                      userImageURL: 1,
                      name: 1,
                      sportizenId: 1,
                    },
                  },
                ],
                as: 'players',
              },
            },

            {
              $project: {
                _id: 0,
                players: 1,
              },
            },
            {
              $replaceRoot: {
                newRoot: { $mergeObjects: [{ $arrayElemAt: ['$players', 0] }, '$$ROOT'] },
              },
            },
            {
              $project: {
                players: 0,
              },
            },
          ],
          as: 'registeredPlayers',
        },
      },
      {
        $lookup: {
          from: 'eventregisteredteams',
          let: { eventId: '$event' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$event', '$$eventId'],
                },
              },
            },
            {
              $lookup: {
                from: 'userprofiles',
                let: { sportizenUser: '$sportizenUser' },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ['$sportizenId', '$$sportizenUser'],
                      },
                    },
                  },
                  {
                    $project: {
                      userImageURL: 1,
                      name: 1,
                      sportizenId: 1,
                    },
                  },
                ],
                as: 'teams',
              },
            },
            {
              $project: {
                _id: 0,
                teams: 1,
              },
            },
            {
              $replaceRoot: {
                newRoot: { $mergeObjects: [{ $arrayElemAt: ['$teams', 0] }, '$$ROOT'] },
              },
            },
            {
              $project: {
                teams: 0,
              },
            },
          ],
          as: 'registeredTeams',
        },
      },
      {
        $addFields: {
          registrations: {
            $setUnion: ['$registeredPlayers', '$registeredTeams'],
          },
        },
      },
      {
        $lookup: {
          from: 'eventregisteredplayers',
          let: { eventId: '$event' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$event', '$$eventId'],
                    },
                    {
                      $eq: ['$sportizenUser', req.user.sportizenId],
                    },
                  ],
                },
              },
            },
          ],
          as: 'players',
        },
      },
      {
        $lookup: {
          from: 'eventregisteredteams',
          let: { eventId: '$event' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$event', '$$eventId'],
                    },
                    {
                      $eq: ['$sportizenUser', req.user.sportizenId],
                    },
                  ],
                },
              },
            },
          ],
          as: 'teams',
        },
      },
      {
        $addFields: {
          registered: { $setUnion: ['$players', '$teams'] },
        },
      },
      {
        $addFields: {
          isRegistered: { $cond: { if: { $eq: ['$registered', []] }, then: false, else: true } },
        },
      },
      {
        $lookup: {
          from: 'userprofiles',
          localField: 'createdBy',
          foreignField: 'sportizenId',
          as: 'sportizenUsers',
        },
      },
      {
        $addFields: {
          sportizenUser: { $arrayElemAt: ['$sportizenUsers', 0] },
        },
      },
      {
        $addFields: {
          createdUserImage: '$sportizenUser.userImageURL',
          createdUser: '$sportizenUser.name',
        },
      },
      {
        $project: {
          sportizenUser: 0,
          sportizenUsers: 0,
          registeredTeams: 0,
          registeredPlayers: 0,
          teams: 0,
          players: 0,
          registered: 0,
        },
      },
    ]);

  
    responseHandler(events, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getAllEvents;
