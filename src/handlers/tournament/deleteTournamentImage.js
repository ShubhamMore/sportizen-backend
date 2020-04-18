const Tournament = require('../../models/tournament.model');
const awsRemoveFile = require('../../uploads/awsRemoveFile');

const deleteTournamentImage = async (req, res) => {
  try {
    const id = req.query.id;
    const image_id = req.query.image_id;
    let i = req.query.index;

    const tournament = await Tournament.findById(id);

    if (!tournament) {
      throw new Error();
    }

    if (tournament.images[i]._id != image_id) {
      i = tournament.images.findIndex((image) => image._id == image_id);
    }

    const public_id = tournament.images[i].public_id;

    await awsRemoveFile(public_id);

    tournament.images.splice(i, 1);

    await Tournament.findByIdAndUpdate(id, tournament);

    res.status(200).send({ success: true });
  } catch (e) {
    let err = 'Something bad happend' + e;
    res.status(400).send(err);
  }
};

module.exports = deleteTournamentImage;
