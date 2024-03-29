const EventRegisteredPlayer = require('../../models/event-model/event-registered-player.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getEventPlayer = async (req, res) => {
  try {
    const eventPlayerRegistration = await EventRegisteredPlayer.findById(req.body.id);

    responseHandler(eventPlayerRegistration, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = getEventPlayer;
