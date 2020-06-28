const Tournament = require('../../models/tournament.model');

const getTournaments = async (req, res) => {
  try {
    let tournament;
    if (req.body.tournamentType === 'team') {
      tournament = await Tournament.findOneAndUpdate(
        { _id: req.body._id },
        { $push: { teams: req.body.team } },
        { upsert: true }
      );
    } else {
      tournament = await Tournament.findOneAndUpdate(
        { _id: req.body._id },
        { $push: { players: req.body.player } },
        { upsert: true }
      );
    }

    if (!tournament) {
      throw new Error('Tournament Not Found');
    }

    res.status(200).send(tournament);
  } catch (e) {
    let err = 'Something bad happend' + e;
    res.status(400).send(err);
  }
};

module.exports = getTournaments;
