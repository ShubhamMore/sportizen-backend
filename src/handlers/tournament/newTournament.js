const Tournament = require('../../models/tournament.model');
const awsUploadFiles = require('../../uploads/awsUploadFiles');

const newTournament = async (req, res) => {
  try {
    const file = req.files;
    const images = new Array();

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

    const tournamentData = {
      name: req.body.name,
      sport: req.body.sport,
      type: req.body.type,
      teams: [], //JSON.parse(req.body.teams),
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      time: req.body.time,
      lattitude: 'lattitude',
      longitude: 'longitude',
      address: 'address',
      description: req.body.description,
      winning_price: req.body.winning_price,
      fees: req.body.fees,
      images: images,
      created_by: req.body.created_by | 'sportizen65@gmail.com',
      created_at: Date.now(),
      modified_at: Date.now(),
    };

    const tournament = new Tournament(tournamentData);

    await tournament.save();

    res.status(201).send(tournament);
  } catch (e) {
    let err = 'Something bad happend' + e;
    res.status(400).send(err);
  }
};

module.exports = newTournament;
