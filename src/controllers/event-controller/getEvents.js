const Event = require('../../models/event.model');
const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getEvents = async (req, res) => {
  try {
    // Search Data
    const searchData = req.query;

    const event = await Event.find(searchData);

    responseHandler(event, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getEvents;
