const EventRegisteredPlayer = require('../../models/event-model/event-registered-player.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const registerPlayer = async (req, res) => {
  try {
    req.body.sportizenUser = req.user.sportizenId;

    const eventPlayerRegistration = await EventRegisteredPlayer.findOne({
      event: req.body.event,
      sportizenUser: req.user.sportizenUser,
    });

    if (eventPlayerRegistration) {
      throw new Error('Already Registered to this Event');
    }

    const newEventPlayerRegistration = new EventRegisteredPlayer(req.body);

    await newEventPlayerRegistration.save();

    responseHandler(newEventPlayerRegistration, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = registerPlayer;
