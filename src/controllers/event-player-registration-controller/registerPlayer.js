const EventRegisteredPlayer = require('../../models/event-registered-player.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const registerPlayer = async (req, res) => {
  try {
    req.body.sportizenUser = req.user.sportizenId;
    const eventPlayerRegistration = new EventRegisteredPlayer(req.body);
    await eventPlayerRegistration.save();

    responseHandler(eventPlayerRegistration, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = registerPlayer;
