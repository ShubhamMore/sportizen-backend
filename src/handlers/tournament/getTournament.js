const Tournament = require('../../models/tournament.model');

const getTournament = async (req, res) => {
  try {
    const id = req.query.id;
    const tournament = await Tournament.findById(id);
    if (!tournament) {
      throw new Error("No Tournament Found..");
    }
    res.status(200).send(tournament);
  } catch (e) {
    let err = 'Something bad happend, ' + e;
    res.status(400).send(err);
  }
};

module.exports = getTournament;
 