const Event = require('../../models/event.model');
const sortArrayOfObjectsById = require('../../functions/sortArrayOfObjectsById');
const getAllEvents = async (req, res) => {
  try {
    const event = await Event.find();

    res.status(200).send(sortArrayOfObjectsById(event, '_id'));
  } catch (e) {
    let err = 'Something bad happend' + e;
    res.status(400).send(err);
  }
};

module.exports = getAllEvents;
