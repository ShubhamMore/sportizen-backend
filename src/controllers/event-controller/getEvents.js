const Event = require('../../models/event-model/event.model');
const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getEvents = async (req, res) => {
  try {
    const event = await Event.find(req.body);

    responseHandler(event, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getEvents;
