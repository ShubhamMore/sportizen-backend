const express = require('express');
const userAuth = require('../../middleware/user-auth');

const getEventTeam = require('../../controllers/event-team-registration-controller/getEventTeam');
const getEventTeams = require('../../controllers/event-team-registration-controller/getEventTeams');
const registerTeam = require('../../controllers/event-team-registration-controller/registerTeam');
const deleteTeamRegistration = require('../../controllers/event-team-registration-controller/deleteTeamRegistration');
const updateTeamRegistration = require('../../controllers/event-team-registration-controller/updateTeamRegistration');

const router = new express.Router();

router.post('/getEventTeams', userAuth, async (req, res) => {
  await getEventTeams(req, res);
});

router.get('/getEventTeams/:id', async (req, res) => {
  await getEventTeams(req, res);
});

router.post('/getEventTeam', userAuth, async (req, res) => {
  await getEventTeam(req, res);
});

router.post('/registerTeam', userAuth, async (req, res) => {
  await registerTeam(req, res);
});

router.post('/deleteTeamRegistration', userAuth, async (req, res) => {
  await deleteTeamRegistration(req, res);
});

router.post('/updateTeamRegistration', userAuth, async (req, res) => {
  await updateTeamRegistration(req, res);
});

module.exports = router;
