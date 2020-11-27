const Event = require('../../models/event.model');
const awsRemoveFile = require('../../uploads/awsRemoveFile');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deleteEventImage = async (req, res) => {
  try {
    const id = req.body.id;
    const imageId = req.body.imageId;
    let i = req.body.index;

    const event = await Event.findById(id);

    if (!event) {
      throw new Error();
    }

    if (event.images[i]._id != imageId) {
      i = event.images.findIndex((image) => image._id == imageId);
    }

    const publicId = event.images[i].publicId;

    await awsRemoveFile(publicId);

    event.images.splice(i, 1);

    await Event.findByIdAndUpdate(id, event);

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = deleteEventImage;
