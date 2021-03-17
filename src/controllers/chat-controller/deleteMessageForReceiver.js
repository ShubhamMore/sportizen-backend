const Chat = require('../../models/chat-model/chat.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deleteMessageForReceiver = async (req, res) => {
  try {
    const chatMessage = await Chat.findByIdAndUpdate(req.body.message, {
      $set: {
        receiverDelete: true,
      },
    });

    if (!chatMessage) {
    }

    responseHandler(chatMessage, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = deleteMessageForReceiver;
