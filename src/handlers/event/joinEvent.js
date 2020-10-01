const Event = require('../../models/event.model');

const getEvents = async (req, res) => {
  try {
    let event;
    if (req.body.eventType === 'team') {
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

    res.status(200).send(event);
  } catch (e) {
    let err = 'Something bad happend' + e;
    res.status(400).send(err);
  }
};

module.exports = getEvents;
