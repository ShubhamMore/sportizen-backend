const EventRegisteredPlayer = require('../../models/event-registered-player.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deletePlayerRegistration = async (req, res) => {
  try {
    const eventPlayerRegistration = await EventRegisteredPlayer.findByIdAndDelete(req.body.id);

    if (!eventPlayerRegistration) {
      throw new Error('Invalid Player');
    }

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = deletePlayerRegistration;
