const Chat = require('../../models/chat-model/chat.model');
const Socket = require('../../sockets/socket');

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

    if (chatMessage) {
      const receiver = Socket.getSocket(req.body.receiver);

      if (receiver) {
        receiver.emit('deleteMessage', { ...req.body });
      }
    }

    responseHandler({ success: true }, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = deleteMessageForBoth;
