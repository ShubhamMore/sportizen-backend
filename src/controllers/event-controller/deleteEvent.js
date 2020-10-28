const Event = require('../../models/event.model');
const awsRemoveFile = require('../../uploads/awsRemoveFile');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deleteEvent = async (req, res) => {
  try {
    const id = req.query.id;
    const event = await Event.findByIdAndRemove(id);
    await event.images.forEach(async (image) => {
      await awsRemoveFile(image.public_id);
    });

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = deleteEvent;
