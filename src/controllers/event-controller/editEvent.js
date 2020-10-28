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

      for (let i = 0; i < file.length; i++) {
        filePaths.push(file[i].path);
        fileNames.push(file[i].filename);
      }

      const cloudeDirectory = 'events';
      const upload_responce = await awsUploadFiles(filePaths, fileNames, cloudeDirectory);

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

    event.name = req.body.name;
    event.sport = req.body.sport;
    event.type = req.body.type;
    event.start_date = req.body.start_date;
    event.end_date = req.body.end_date;
    event.registerTill = req.body.registerTill;
    event.players = req.body.players;
    // event.time = req.body.time;
    event.description = req.body.description;
    event.winning_price = req.body.winning_price;
    event.fees = req.body.fees;
    event.images = images;
    event.modified_at = Date.now();

    await Event.findByIdAndUpdate(event._id, event);

    responseHandler(event, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = editEvent;
