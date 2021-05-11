const Event = require('../../models/event-model/event.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const cancelEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.body.id, { status: false });

    if (!event) {
      throw new Error('Event Not Found');
    }

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = cancelEvent;
