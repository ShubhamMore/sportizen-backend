const Tournament = require('../../models/tournament.model');
const awsUploadFiles = require('../../uploads/awsUploadFiles');

const editTournament = async (req, res) => {
  try {
    const file = req.files;

    const tournament = await Tournament.findById(req.body._id);

    const images = tournament.images;

    if (file !== undefined) {
      let filePaths = new Array();
      let fileNames = new Array();

      for (let i = 0; i < file.length; i++) {
        filePaths.push(file[i].path);
        fileNames.push(file[i].filename);
      }

      const cloudeDirectory = 'tournaments';
      const upload_responce = await awsUploadFiles(filePaths, fileNames, cloudeDirectory);

      const upload_res = upload_responce.upload_res;
      const upload_res_len = upload_res.length;

      if (upload_res_len > 0) {
        for (let i = 0; i < upload_res_len; i++) {
          const image_data = {
            image_name: upload_res[i].key,
            secure_url: upload_res[i].Location,
            public_id: upload_res[i].key,
            created_at: Date.now(),
          };
          images.push(image_data);
        }
      }
    }

    tournament.name = req.body.name;
    tournament.sport = req.body.sport;
    tournament.type = req.body.type;
    tournament.start_date = req.body.start_date;
    tournament.end_date = req.body.end_date;
    tournament.time = req.body.time;
    tournament.description = req.body.description;
    tournament.winning_price = req.body.winning_price;
    tournament.fees = req.body.fees;
    tournament.images = images;
    tournament.modified_at = Date.now();

    await Tournament.findByIdAndUpdate(tournament._id, tournament);
    res.status(201).send(tournament);
  } catch (e) {
    let err = 'Something bad happend' + e;
    res.status(400).send(err);
  }
};

module.exports = editTournament;
