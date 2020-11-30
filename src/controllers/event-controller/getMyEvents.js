const Event = require('../../models/event.model');
const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getMyEvents = async (req, res) => {
  try {
    const event = await Event.find({ createdBy: req.user.sportizenId });

    responseHandler(event, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getMyEvents;
