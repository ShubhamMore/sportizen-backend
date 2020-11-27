const express = require('express');

const multer = require('multer');

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

const auth = require('../middleware/auth');

const newEvent = require('../controllers/event-controller/newEvent');
const editEvent = require('../controllers/event-controller/editEvent');
const getEvent = require('../controllers/event-controller/getEvent');
const getEvents = require('../controllers/event-controller/getEvents');
const getMyEvents = require('../controllers/event-controller/getMyEvents');
const getAllEvents = require('../controllers/event-controller/getAllEvents');
const deleteEvent = require('../controllers/event-controller/deleteEvent');
const deleteEventImage = require('../controllers/event-controller/deleteEventImage');

const router = new express.Router();

router.post(
  '/newEvent',
  auth,
  multer({ storage: storage }).array('eventImage'),
  async (req, res) => {
    await newEvent(req, res);
  }
);

router.post(
  '/editEvent',
  auth,
  multer({ storage: storage }).array('eventImage'),
  async (req, res) => {
    await editEvent(req, res);
  }
);

router.post('/getEvents', auth, async (req, res) => {
  await getEvents(req, res);
});

router.post('/getMyEvents', auth, async (req, res) => {
  await getMyEvents(req, res);
});

router.post('/getAllEvents', auth, async (req, res) => {
  await getAllEvents(req, res);
});

router.post('/getEvent', auth, async (req, res) => {
  await getEvent(req, res);
});

router.post('/deleteEvent', auth, async (req, res) => {
  await deleteEvent(req, res);
});

router.post('/deleteEventImage', auth, async (req, res) => {
  await deleteEventImage(req, res);
});

module.exports = router;
