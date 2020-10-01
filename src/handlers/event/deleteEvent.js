const Event = require('../../models/event.model');
const awsRemoveFile = require('../../uploads/awsRemoveFile');

const deleteEvent = async (req, res) => {
  try {
    const id = req.query.id;
    const event = await Event.findByIdAndRemove(id);
    await event.images.forEach(async (image) => {
      await awsRemoveFile(image.public_id);
    });
    res.status(200).send({ success: true });
  } catch (e) {
    let err = 'Something bad happend' + e;
    res.status(400).send(err);
  }
};

module.exports = deleteEvent;
