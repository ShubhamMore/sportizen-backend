const express = require('express');

const userAuth = require('../../middleware/user-auth');

const getChats = require('../../controllers/chat-controller/getChats');
const deleteAllMessages = require('../../controllers/chat-controller/deleteAllMessages');
const deleteMessageForBoth = require('../../controllers/chat-controller/deleteMessageForBoth');
const deleteMessageForReceiver = require('../../controllers/chat-controller/deleteMessageForReceiver');
const deleteMessageForSender = require('../../controllers/chat-controller/deleteMessageForSender');

const router = new express.Router();

router.post('/getChats', userAuth, async (req, res) => {
  await getChats(req, res);
});

router.post('/deleteAllMessages', userAuth, async (req, res) => {
  await deleteAllMessages(req, res);
});

router.post('/deleteMessageForBoth', userAuth, async (req, res) => {
  await deleteMessageForBoth(req, res);
});

router.post('/deleteMessageForReceiver', userAuth, async (req, res) => {
  await deleteMessageForReceiver(req, res);
});

router.post('/deleteMessageForSender', userAuth, async (req, res) => {
  await deleteMessageForSender(req, res);
});

module.exports = router;
