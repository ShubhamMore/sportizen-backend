const Event = require('../../models/event.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const awsUploadFiles = require('../../uploads/awsUploadFiles');

const newEvent = async (req, res) => {
  try {
    const file = req.files;
    const images = new Array();

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

    const eventData = {
      name: req.body.name,
      sport: req.body.sport,
      registrationType: req.body.registrationType,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      registerTill: req.body.registerTill,
      noOfPlayers: req.body.noOfPlayers,
      latitude: 'latitude',
      longitude: 'longitude',
      address: 'address',
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
