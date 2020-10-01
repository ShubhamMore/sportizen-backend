const express = require('express');

const multer = require('multer');
const auth = require('../middleware/auth');
const newEvent = require('../handlers/event/newEvent');
const editEvent = require('../handlers/event/editEvent');
const getEvent = require('../handlers/event/getEvent');
const getEvents = require('../handlers/event/getEvents');
const getAllEvents = require('../handlers/event/getAllEvents');
const deleteEvent = require('../handlers/event/deleteEvent');
const deleteEventImage = require('../handlers/event/deleteEventImage');
const router = new express.Router();

const MIME_TYPE_MAP = {
  // IMAGES
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'fileToUpload');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, 'event-' + name.substring(0, name.lastIndexOf('.')) + '-' + Date.now() + '.' + ext);
  },
});

router.post('/newEvent', multer({ storage: storage }).array('eventImage'), async (req, res) => {
  await newEvent(req, res);
});

router.post('/editEvent', multer({ storage: storage }).array('eventImage'), async (req, res) => {
  await editEvent(req, res);
});

router.get('/getEvents', async (req, res) => {
  await getEvents(req, res);
});

router.get('/getAllEvents', async (req, res) => {
  await getAllEvents(req, res);
});

router.get('/getEvent', async (req, res) => {
  await getEvent(req, res);
});

router.delete('/deleteEvent', async (req, res) => {
  await deleteEvent(req, res);
});

router.delete('/deleteEventImage', async (req, res) => {
  await deleteEventImage(req, res);
});

module.exports = router;
