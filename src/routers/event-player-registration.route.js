const express = require('express');
const auth = require('../middleware/auth');

const registerPlayer = require('../controllers/event-player-registration-controller/registerPlayer');
const getEventPlayer = require('../controllers/event-player-registration-controller/getEventPlayer');
const getEventPlayers = require('../controllers/event-player-registration-controller/getEventPlayers');
const deletePlayerRegistration = require('../controllers/event-player-registration-controller/deletePlayerRegistration');

const router = new express.Router();

router.post('/getEventPlayers', auth, async (req, res) => {
  await getEventPlayers(req, res);
});

router.post('/getEventPlayer', auth, async (req, res) => {
  await getEventPlayer(req, res);
});

router.post('/registerPlayer', auth, async (req, res) => {
  await registerPlayer(req, res);
});

router.post('/deletePlayerRegistration', auth, async (req, res) => {
  await deletePlayerRegistration(req, res);
});

module.exports = router;
