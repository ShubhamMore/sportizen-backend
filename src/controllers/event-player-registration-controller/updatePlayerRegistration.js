const EventRegisteredPlayer = require('../../models/event-registered-player.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const updatePlayerRegistration = async (req, res) => {
  try {
    const eventPlayerRegistration = await EventRegisteredPlayer.findByIdAndUpdate(
      req.body._id,
      req.body
    );

    if (!eventPlayerRegistration) {
      throw new Error('Invalid Player');
    }

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    console.log(e);
    errorHandler(e, 400, res);
  }
};

module.exports = updatePlayerRegistration;
