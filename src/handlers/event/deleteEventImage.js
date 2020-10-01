const Event = require('../../models/event.model');
const awsRemoveFile = require('../../uploads/awsRemoveFile');

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

    res.status(200).send({ success: true });
  } catch (e) {
    let err = 'Something bad happend' + e;
    res.status(400).send(err);
  }
};

module.exports = deleteEventImage;
