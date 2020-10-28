const express = require('express');

const auth = require('../middleware/auth');

const searchNewConnections = require('../controllers/user-connection-controller/searchNewConnections');
const changeUserStatus = require('../controllers/user-connection-controller/changeUserStatus');
const getMyFollowers = require('../controllers/user-connection-controller/getMyFollowers');
const getMyFollowings = require('../controllers/user-connection-controller/getMyFollowings');
const getBlockedConnections = require('../controllers/user-connection-controller/getBlockedConnections');
const getConnectionRequests = require('../controllers/user-connection-controller/getConnectionRequests');
const sendConnectionRequest = require('../controllers/user-connection-controller/sendConnectionRequest');

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
