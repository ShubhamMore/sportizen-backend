const Event = require('../../models/event-model/event.model');
const mongoose = require('mongoose');
const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getEvent = async (req, res) => {
  try {
    const eventId = req.body.id ? req.body.id : req.params.id;

    const sportizenId = req.user ? req.user.sportizenId : '';

    if (mongoose.Types.ObjectId.isValid(eventId)) {
      const event = await Event.aggregate([
        {
          $match: {
            _id: mongoose.Types.ObjectId(eventId),
          },
        },
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
                        $eq: ['$sportizenUser', sportizenId],
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
                        $eq: ['$sportizenUser', sportizenId],
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
            registration: {
              $arrayElemAt: [{ $setUnion: ['$players', '$teams'] }, 0],
            },
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

      if (!event[0]) {
        throw new Error('No Event Found..');
      }

      responseHandler(event[0], 200, res);
    } else {
      throw new Error('invalid Event Id');
    }
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getEvent;
