const Event = require('../../models/event.model');
const mongoose = require('mongoose');
const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getEvent = async (req, res) => {
  try {
    const event = await Event.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.body.id),
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

    if (!event[0]) {
      throw new Error('No Event Found..');
    }

    responseHandler(event[0], 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getEvent;
