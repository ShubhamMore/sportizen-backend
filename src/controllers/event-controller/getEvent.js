const Event = require('../../models/event.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.body.id);

    if (!event) {
      throw new Error('No Event Found..');
    }

    responseHandler(event, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getEvent;
