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

      for (let i = 0; i < file.length; i++) {
        filePaths.push(file[i].path);
        fileNames.push(file[i].filename);
      }

      const cloudDirectory = 'events';
      const upload_responce = await awsUploadFiles(filePaths, fileNames, cloudDirectory);

      const upload_res = upload_responce.upload_res;
      const upload_res_len = upload_res.length;

      if (upload_res_len > 0) {
        for (let i = 0; i < upload_res_len; i++) {
          const image_data = {
            image_name: upload_res[i].key,
            secure_url: upload_res[i].Location,
            public_id: upload_res[i].key,
            created_at: Date.now(),
          };
          images.push(image_data);
        }
      }
    }

    const eventData = {
      name: req.body.name,
      sport: req.body.sport,
      type: req.body.type,
      teams: [],
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      registerTill: req.body.registerTill,
      noOfPlayers: req.body.noOfPlayers,
      players: [],
      lattitude: 'lattitude',
      longitude: 'longitude',
      address: 'address',
      description: req.body.description,
      winning_price: req.body.winning_price,
      fees: req.body.fees,
      images: images,
      created_by: req.body.created_by !== undefined ? req.body.created_by : 'sportizen65@gmail.com',
      created_at: Date.now(),
      modified_at: Date.now(),
    };

    const event = new Event(eventData);

    // console.log(event);

    await event.save();
    responseHandler(event, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = newEvent;
