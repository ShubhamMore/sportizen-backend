const Event = require('../../models/event-model/event.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getAllEvents = async (req, res) => {
  try {
    const query = {};

    // if (req.body.longitude && req.body.latitude) {
    //   query.location = {
    //     $geoWithin: { $centerSphere: [[req.body.latitude, req.body.longitude], 100 / 3963.2] },
    //     // 10 Miles of Radius, The query converts the distance to radians by dividing by the approximate equatorial radius of the earth, 3963.2 miles
    //   };
    // }

    const events = await Event.aggregate([
      {
        $match: query,
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
          createdUser: '$sportizenUser.name',
        },
      },
      {
        $project: {
          sportizenUser: 0,
          sportizenUsers: 0,
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
