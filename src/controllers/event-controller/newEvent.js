const Event = require('../../models/event-model/event.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const awsUploadFiles = require('../../uploads/awsUploadFiles');

const newEvent = async (req, res) => {
  try {
    const file = req.files;
    const images = new Array();

    if (file.length > 0 && file !== undefined) {
      let filePaths = new Array();
      let fileNames = new Array();

      const n = file.length;

      for (let i = 0; i < n; i++) {
        filePaths.push(file[i].path);
        fileNames.push(file[i].filename);
      }

      const cloudDirectory = 'events';
      const uploadResponce = await awsUploadFiles(filePaths, fileNames, cloudDirectory);

      const uploadRes = uploadResponce.uploadRes;
      const uploadResLen = uploadRes.length;

      if (uploadResLen > 0) {
        for (let i = 0; i < uploadResLen; i++) {
          const image = {
            imageName: uploadRes[i].key,
            secureUrl: uploadRes[i].Location,
            publicId: uploadRes[i].key,
            createdAt: Date.now(),
          };
          images.push(image);
        }
      }
    }

    console.log(req.body);

    const eventData = {
      name: req.body.name,
      sport: req.body.sport,
      eventType: req.body.eventType,
      noOfRegistrations: req.body.noOfRegistrations,
      registrationType: req.body.registrationType,
      durationType: req.body.durationType,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      registerTill: req.body.registerTill,
      time: req.body.time,
      noOfPlayers: req.body.noOfPlayers,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      location: {
        type: 'Point',
        coordinates: [+req.body.latitude, +req.body.longitude],
      },
      description: req.body.description,
      winningPrice: req.body.winningPrice,
      fees: req.body.fees,
      images: images,
      createdBy: req.user.sportizenId,
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    };

    const event = new Event(eventData);

    // console.log(event);

    await event.save();
    responseHandler(event, 200, res);
  } catch (e) {
    console.log(e);
    errorHandler(e, 400, res);
  }
};

module.exports = newEvent;
