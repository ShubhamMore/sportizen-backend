const Event = require('../../models/event.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getEvents = async (req, res) => {
  try {
    let event;
    if (req.body.registerType === 'team') {
      event = await Event.findOneAndUpdate(
        { _id: req.body._id },
        { $push: { teams: req.body.team } },
        { upsert: true }
      );
    } else {
      event = await Event.findOneAndUpdate(
        { _id: req.body._id },
        { $push: { players: req.body.player } },
        { upsert: true }
      );
    }

    if (!event) {
      throw new Error('Event Not Found');
    }

    responseHandler(event, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = getEvents;
