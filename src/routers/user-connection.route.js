const express = require('express');

const auth = require('../middleware/auth');

const searchNewConnections = require('../handlers/user-connection/searchNewConnections');
const changeUserStatus = require('../handlers/user-connection/changeUserStatus');
const getMyFollowers = require('../handlers/user-connection/getMyFollowers');
const getMyFollowings = require('../handlers/user-connection/getMyFollowings');
const getBlockedConnections = require('../handlers/user-connection/getBlockedConnections');
const getConnectionRequests = require('../handlers/user-connection/getConnectionRequests');
const sendConnectionRequest = require('../handlers/user-connection/sendConnectionRequest');

const router = new express.Router();

router.post('/searchNewConnections', auth, async (req, res) => {
  await searchNewConnections(req, res);
});

router.post('/changeUserConnectionStatus', auth, async (req, res) => {
  await changeUserStatus(req, res);
});

router.post('/getMyFollowers', auth, async (req, res) => {
  await getMyFollowers(req, res);
});

router.post('/getMyFollowings', auth, async (req, res) => {
  await getMyFollowings(req, res);
});

router.post('/getBlockedConnections', auth, async (req, res) => {
  await getBlockedConnections(req, res);
});

router.post('/getConnectionRequests', auth, async (req, res) => {
  await getConnectionRequests(req, res);
});

router.post('/sendConnectionRequest', auth, async (req, res) => {
  await sendConnectionRequest(req, res);
});

module.exports = router;
