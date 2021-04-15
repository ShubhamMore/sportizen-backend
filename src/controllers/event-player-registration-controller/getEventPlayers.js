const EventRegisteredPlayer = require('../../models/event-model/event-registered-player.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getEventPlayers = async (req, res) => {
  try {
    const eventPlayerRegistrations = await EventRegisteredPlayer.aggregate([
      { $match: { event: req.body.event } },
      {
        $lookup: {
          from: 'userprofiles',
          localField: 'sportizenUser',
          foreignField: 'sportizenId',
          as: 'user',
        },
      },
      {
        $replaceRoot: {
          newRoot: { $mergeObjects: [{ $arrayElemAt: ['$user', 0] }, '$$ROOT'] },
        },
      },
      {
        $project: {
          user: 0,
        },
      },
      {
        $project: {
          name: 1,
          userImageURL: 1,
          email: 1,
          contact: '$phoneNo',
          sportizenUser: 1,
        },
      },
    ]);

    responseHandler(eventPlayerRegistrations, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getEventPlayers;
