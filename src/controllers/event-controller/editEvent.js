const Event = require('../../models/event.model');

const awsUploadFiles = require('../../uploads/awsUploadFiles');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const editEvent = async (req, res) => {
  try {
    const file = req.files;

    const event = await Event.findById(req.body._id);

    const images = event.images;

    if (file !== undefined) {
      let filePaths = new Array();
      let fileNames = new Array();

      const n = file.length;

      for (let i = 0; i < n; i++) {
        filePaths.push(file[i].path);
        fileNames.push(file[i].filename);
      }

      const cloudDirectory = 'events';
      const uploadResponce = await awsUploadFiles(filePaths, fileNames, cloudDirectory);

      const uploadRes = uploadResponce.upload_res;
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

    event.name = req.body.name;
    event.sport = req.body.sport;
    event.registrationType = req.body.registrationType;
    event.startDate = req.body.startDate;
    event.endDate = req.body.endDate;
    event.registerTill = req.body.registerTill;
    // event.time = req.body.time;
    event.noOfPlayers = req.body.noOfPlayers;
    event.address = req.body.address;
    event.state = req.body.state;
    event.city = req.body.city;
    event.location = {
      type: 'Point',
      coordinates: [+req.body.latitude, +req.body.longitude],
    };
    event.description = req.body.description;
    event.winningPrice = req.body.winningPrice;
    event.fees = req.body.fees;
    event.images = images;
    event.modifiedAt = Date.now();

    await Event.findByIdAndUpdate(event._id, event);

    responseHandler(event, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = editEvent;
