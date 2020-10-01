const Event = require('../../models/event.model');

const getEvent = async (req, res) => {
  try {
    const id = req.query.id;
    const event = await Event.findById(id);
    if (!event) {
      throw new Error('No Event Found..');
    }
    res.status(200).send(event);
  } catch (e) {
    let err = 'Something bad happend, ' + e;
    res.status(400).send(err);
  }
};

module.exports = getEvent;
