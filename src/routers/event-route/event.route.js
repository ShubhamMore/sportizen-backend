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

const userAuth = require('../../middleware/user-auth');
const auth = require('../../middleware/auth');

const newEvent = require('../../controllers/event-controller/newEvent');
const editEvent = require('../../controllers/event-controller/editEvent');
const getEvent = require('../../controllers/event-controller/getEvent');
const getJoinedEvents = require('../../controllers/event-controller/getJoinedEvents');
const getMyEvents = require('../../controllers/event-controller/getMyEvents');
const getAllEvents = require('../../controllers/event-controller/getAllEvents');
const deleteEvent = require('../../controllers/event-controller/deleteEvent');
const deleteEventImage = require('../../controllers/event-controller/deleteEventImage');

const router = new express.Router();

router.post(
  '/newEvent',
  userAuth,
  multer({ storage: storage }).array('eventImage'),
  async (req, res) => {
    await newEvent(req, res);
  }
);

router.post(
  '/editEvent',
  userAuth,
  multer({ storage: storage }).array('eventImage'),
  async (req, res) => {
    await editEvent(req, res);
  }
);

router.post('/getJoinedEvents', userAuth, async (req, res) => {
  await getJoinedEvents(req, res);
});

router.post('/getMyEvents', userAuth, async (req, res) => {
  await getMyEvents(req, res);
});

router.get('/getAllEvents/:limit/:skip/:longitude/:latitude', auth, async (req, res) => {
  await getAllEvents(req, res);
});

// router.post('/getEvent', userAuth, async (req, res) => {
//   await getEvent(req, res);
// });

router.get('/getEvent/:id', auth, async (req, res) => {
  await getEvent(req, res);
});

router.post('/deleteEvent', userAuth, async (req, res) => {
  await deleteEvent(req, res);
});

router.post('/deleteEventImage', userAuth, async (req, res) => {
  await deleteEventImage(req, res);
});

module.exports = router;
