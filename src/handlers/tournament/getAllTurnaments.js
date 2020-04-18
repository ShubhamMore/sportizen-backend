const Tournament = require('../../models/tournament.model');
const sortArrayOfObjectsById = require('../../functions/sortArrayOfObjectsById');
const getAllTournaments = async (req, res) => {
  try {
    const tournament = await Tournament.find();

    res.status(200).send(sortArrayOfObjectsById(tournament, '_id'));
  } catch (e) {
    let err = 'Something bad happend' + e;
    res.status(400).send(err);
  }
};

module.exports = getAllTournaments;
