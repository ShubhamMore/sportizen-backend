const express = require('express');
const auth = require('../../middleware/auth');

const getEventTeam = require('../../controllers/event-team-registration-controller/getEventTeam');
const getEventTeams = require('../../controllers/event-team-registration-controller/getEventTeams');
const registerTeam = require('../../controllers/event-team-registration-controller/registerTeam');
const deleteTeamRegistration = require('../../controllers/event-team-registration-controller/deleteTeamRegistration');
const updateTeamRegistration = require('../../controllers/event-team-registration-controller/updateTeamRegistration');

const router = new express.Router();

router.post('/getEventTeams', auth, async (req, res) => {
  await getEventTeams(req, res);
});

router.post('/getEventTeam', auth, async (req, res) => {
  await getEventTeam(req, res);
});

router.post('/registerTeam', auth, async (req, res) => {
  await registerTeam(req, res);
});

router.post('/deleteTeamRegistration', auth, async (req, res) => {
  await deleteTeamRegistration(req, res);
});

router.post('/updateTeamRegistration', auth, async (req, res) => {
  await updateTeamRegistration(req, res);
});

module.exports = router;
