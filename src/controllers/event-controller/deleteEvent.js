const Event = require('../../models/event.model');
const awsRemoveFile = require('../../uploads/awsRemoveFile');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndRemove(req.body.id);
    await event.images.forEach(async (image) => {
      await awsRemoveFile(image.publicId);
    });

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = deleteEvent;
