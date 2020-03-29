const express = require('express');
const multer = require('multer');
const Tournament = require('../models/tournament.model');
const auth = require('../middleware/auth');
const sendMail = require('../email/mail');
const awsUploadFiles = require('../uploads/awsUploadFiles');
const awsRemoveFile = require('../uploads/awsRemoveFile');
const router = new express.Router();

const MIME_TYPE_MAP = {
  // IMAGES
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'fileToUpload');
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post(
  '/newTournament',
  multer({ storage: storage }).array('tournamentImages'),
  async (req, res, next) => {
    try {
      const file = req.files;

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

        const images = new Array();

        if (upload_res_len > 0) {
          for (let i = 0; i < upload_res_len; i++) {
            const image_data = {
              image_name: upload_res[i].key,
              secure_url: upload_res[i].Location,
              public_id: upload_res[i].key,
              created_at: Date.now()
            };
            images.push(image_data);
          }
        }
      }

      const tournamentData = {
        name: req.body.name,
        sport: req.body.sport,
        type: req.body.type,
        teams: req.body.teams,
        tournament_period: req.body.tournament_period,
        location: req.body.location,
        description: req.body.description,
        images: images,
        created_at: req.body.created_at,
        modified_at: req.body.modified_at
      };

      const tournament = new Tournament(tournamentData);
      await tournament.save();

      res.status(201).send({ success: true });
    } catch (e) {
      let err = 'Something bad happend' + e;
      res.status(400).send(err);
    }
  }
);

module.exports = router;
