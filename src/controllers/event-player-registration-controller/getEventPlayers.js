const EventRegisteredPlayer = require('../../models/event-model/event-registered-player.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getEventPlayers = async (req, res) => {
  try {
    const eventPlayerRegistrations = await EventRegisteredPlayer.find({ event: req.body.event });

    responseHandler(eventPlayerRegistrations, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getEventPlayers;
