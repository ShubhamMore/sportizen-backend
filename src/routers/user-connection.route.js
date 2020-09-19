const express = require('express');

const auth = require('../middleware/auth');
const changeUserStatus = require('../handlers/user-connection/changeUserStatus');
const getMyConnections = require('../handlers/user-connection/getMyConnections');
const getBlockedConnections = require('../handlers/user-connection/getBlockedConnections');
const getConnectionRequests = require('../handlers/user-connection/getConnectionRequests');

const router = new express.Router();

router.post('/changeUserConnectionStatus', auth, async (req, res) => {
  await changeUserStatus(req, res);
});

router.post('/getMyConnections', auth, async (req, res) => {
  await getMyConnections(req, res);
});

router.post('/getBlockedConnections', auth, async (req, res) => {
  await getBlockedConnections(req, res);
});

router.post('/getConnectionRequests', auth, async (req, res) => {
  await getConnectionRequests(req, res);
});

module.exports = router;
