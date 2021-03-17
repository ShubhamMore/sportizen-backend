const express = require('express');

const auth = require('../../middleware/auth');

const getChats = require('../../controllers/chat-controller/getChats');
const deleteMessageForBoth = require('../../controllers/chat-controller/deleteMessageForBoth');
const deleteMessageForReceiver = require('../../controllers/chat-controller/deleteMessageForReceiver');
const deleteMessageForSender = require('../../controllers/chat-controller/deleteMessageForSender');

const router = new express.Router();

router.post('/getChats', auth, async (req, res) => {
  await getChats(req, res);
});

router.post('/deleteMessageForBoth', auth, async (req, res) => {
  await deleteMessageForBoth(req, res);
});

router.post('/deleteMessageForReceiver', auth, async (req, res) => {
  await deleteMessageForReceiver(req, res);
});

router.post('/deleteMessageForSender', auth, async (req, res) => {
  await deleteMessageForSender(req, res);
});

module.exports = router;
