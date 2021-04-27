const express = require('express');
const userAuth = require('../../middleware/user-auth');

const registerPlayer = require('../../controllers/event-player-registration-controller/registerPlayer');
const getEventPlayer = require('../../controllers/event-player-registration-controller/getEventPlayer');
const getEventPlayers = require('../../controllers/event-player-registration-controller/getEventPlayers');
const updatePlayerRegistration = require('../../controllers/event-player-registration-controller/updatePlayerRegistration');
const deletePlayerRegistration = require('../../controllers/event-player-registration-controller/deletePlayerRegistration');

const router = new express.Router();

router.post('/getEventPlayers', userAuth, async (req, res) => {
  await getEventPlayers(req, res);
});

router.get('/getEventPlayers/:id', async (req, res) => {
  await getEventPlayers(req, res);
});

router.post('/getEventPlayer', userAuth, async (req, res) => {
  await getEventPlayer(req, res);
});

router.post('/registerPlayer', userAuth, async (req, res) => {
  await registerPlayer(req, res);
});

router.post('/updatePlayerRegistration', userAuth, async (req, res) => {
  await updatePlayerRegistration(req, res);
});

router.post('/deletePlayerRegistration', userAuth, async (req, res) => {
  await deletePlayerRegistration(req, res);
});

module.exports = router;
