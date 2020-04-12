const Tournament = require('../../models/tournament.model');

const getTournaments = async (req, res) => {
  try {
    // Search Data
    const searchData = req.query;
    const tournament = await Tournament.find(searchData);
    res.status(200).send(tournament);
  } catch (e) {
    let err = 'Something bad happend' + e;
    res.status(400).send(err);
  }
};

module.exports = getTournaments;
 