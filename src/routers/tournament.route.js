const express = require('express');

const multer = require('multer');
const auth = require('../middleware/auth');
const newTournament = require('../handlers/tournament/newTournament');
const getTournament = require('../handlers/tournament/getTournament');
const getTournaments = require('../handlers/tournament/getTournaments');
const getAllTournaments = require('../handlers/tournament/getAllTurnaments');
const router = new express.Router();

const MIME_TYPE_MAP = {
  // IMAGES
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
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
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(
      null,
      'tournament-' + name.substring(0, name.lastIndexOf('.')) + '-' + Date.now() + '.' + ext
    );
  },
});

router.post(
  '/newTournament',
  auth,
  multer({ storage: storage }).array('tournamentImage'),
  async (req, res) => {
    await newTournament(req, res);
  }
);

router.get('/getTournaments', auth, async (req, res) => {
  await getTournaments(req, res);
});

router.get('/getAllTournaments', async (req, res) => {
  await getAllTournaments(req, res);
});

router.get('/getTournament', async (req, res) => {
  await getTournament(req, res);
});

module.exports = router;
