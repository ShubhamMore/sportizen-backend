const Event = require('../../models/event.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort();

    responseHandler(events, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getAllEvents;
