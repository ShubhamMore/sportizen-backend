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
const getAllEvents = require('../controllers/event-controller/getAllEvents');
const deleteEvent = require('../controllers/event-controller/deleteEvent');
const deleteEventImage = require('../controllers/event-controller/deleteEventImage');

const router = new express.Router();

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
