const Event = require('../../models/event.model');
const awsRemoveFile = require('../../uploads/awsRemoveFile');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deleteEventImage = async (req, res) => {
  try {
    const id = req.query.id;
    const image_id = req.query.image_id;
    let i = req.query.index;

    const event = await Event.findById(id);

    if (!event) {
      throw new Error();
    }

    if (event.images[i]._id != image_id) {
      i = event.images.findIndex((image) => image._id == image_id);
    }

    const public_id = event.images[i].public_id;

    await awsRemoveFile(public_id);

    event.images.splice(i, 1);

    await Event.findByIdAndUpdate(id, event);

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = deleteEventImage;
