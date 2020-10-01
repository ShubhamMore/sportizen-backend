const Event = require('../../models/event.model');

const getEvents = async (req, res) => {
  try {
    // Search Data
    const searchData = req.query;
    const event = await Event.find(searchData);
    res.status(200).send(event);
  } catch (e) {
    let err = 'Something bad happend' + e;
    res.status(400).send(err);
  }
};

module.exports = getEvents;
