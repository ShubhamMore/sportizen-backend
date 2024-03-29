const express = require('express');

const userAuth = require('../../middleware/user-auth');

const changeUserStatus = require('../../controllers/user-connection-controller/changeUserStatus');
const getBlockedConnections = require('../../controllers/user-connection-controller/getBlockedConnections');
const getConnectionRequests = require('../../controllers/user-connection-controller/getConnectionRequests');
const getMyConnections = require('../../controllers/user-connection-controller/getMyConnections');
const getMyFollowers = require('../../controllers/user-connection-controller/getMyFollowers');
const getMyFollowings = require('../../controllers/user-connection-controller/getMyFollowings');
const getUserFollowers = require('../../controllers/user-connection-controller/getUserFollowers');
const getUserFollowings = require('../../controllers/user-connection-controller/getUserFollowings');
const searchNewConnections = require('../../controllers/user-connection-controller/searchNewConnections');
const sendConnectionRequest = require('../../controllers/user-connection-controller/sendConnectionRequest');
const removeFollowerConnection = require('../../controllers/user-connection-controller/removeFollowerConnection');
const unfollowConnection = require('../../controllers/user-connection-controller/unfollowConnection');

const router = new express.Router();

router.post('/searchNewConnections', userAuth, async (req, res) => {
  await searchNewConnections(req, res);
});

router.post('/changeUserConnectionStatus', userAuth, async (req, res) => {
  await changeUserStatus(req, res);
});

router.post('/getMyConnections', userAuth, async (req, res) => {
  await getMyConnections(req, res);
});

router.post('/getMyFollowers', userAuth, async (req, res) => {
  await getMyFollowers(req, res);
});

router.post('/getMyFollowings', userAuth, async (req, res) => {
  await getMyFollowings(req, res);
});

router.post('/getUserFollowers', userAuth, async (req, res) => {
  await getUserFollowers(req, res);
});

router.post('/getUserFollowings', userAuth, async (req, res) => {
  await getUserFollowings(req, res);
});

router.post('/getBlockedConnections', userAuth, async (req, res) => {
  await getBlockedConnections(req, res);
});

router.post('/getConnectionRequests', userAuth, async (req, res) => {
  await getConnectionRequests(req, res);
});

router.post('/sendConnectionRequest', userAuth, async (req, res) => {
  await sendConnectionRequest(req, res);
});

router.post('/removeFollowerConnection', userAuth, async (req, res) => {
  await removeFollowerConnection(req, res);
});

router.post('/unfollowConnection', userAuth, async (req, res) => {
  await unfollowConnection(req, res);
});

module.exports = router;
