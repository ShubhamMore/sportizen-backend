const Tournament = require('../../models/tournament.model');
const awsRemoveFile = require('../../uploads/awsRemoveFile');

const deleteTournament = async (req, res) => {
  try {
    const id = req.query.id;
    const tournament = await Tournament.findByIdAndRemove(id);
    await tournament.images.forEach(async (image) => {
      await awsRemoveFile(image.public_id);
    });
    res.status(200).send({ success: true });
  } catch (e) {
    let err = 'Something bad happend' + e;
    res.status(400).send(err);
  }
};

module.exports = deleteTournament;
