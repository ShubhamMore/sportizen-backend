const Chat = require('../../models/chat-model/chat.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deleteMessageForBoth = async (req, res) => {
  try {
    const chatMessage = await Chat.findByIdAndUpdate(req.body.message, {
      $set: {
        receiverDelete: true,
        senderDelete: true,
      },
    });

    if (!chatMessage) {
    }

    responseHandler(chatMessage, 200, res);
  } catch (e) {
    errorHandler(e, 400, res);
  }
};

module.exports = deleteMessageForBoth;
