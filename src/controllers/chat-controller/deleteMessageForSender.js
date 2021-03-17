const Chat = require('../../models/chat-model/chat.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deleteMessageForSender = async (req, res) => {
  try {
    const chatMessage = await Chat.findByIdAndUpdate(req.body.message, {
      $set: {
        senderDelete: true,
      },
    });

    if (!chatMessage) {
    }

    responseHandler({ success: true }, 200, res);
  } catch (e) {
    console.log(e);
    errorHandler(e, 400, res);
  }
};

module.exports = deleteMessageForSender;
