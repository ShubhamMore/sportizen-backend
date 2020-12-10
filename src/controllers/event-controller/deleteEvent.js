const Event = require('../../models/event.model');
const EventRegisteredPlayer = require('../../models/event-registered-player.model');
const EventRegisteredTeam = require('../../models/event-registered-team.model');

const awsRemoveFile = require('../../uploads/awsRemoveFile');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndRemove(req.body.id);

    if (!event) {
      throw new Error('Event Not Found');
    }

    await event.images.forEach(async (image) => {
      await awsRemoveFile(image.publicId);
    });

    if (event.eventType === '0') {
      await EventRegisteredPlayer.deleteMany({ event: event._ipred.toString() });
    } else if (event.eventType === '1') {
      await EventRegisteredTeam.deleteMany({ event: event._id.toString() });
    }
    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = deleteEvent;
