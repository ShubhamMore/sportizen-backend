const Chat = require('../../models/chat-model/chat.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const deleteAllMessages = async (req, res) => {
  try {
    const chatMessageForSender = Chat.updateMany(
      { senderId: req.user.sportizenId, receiverId: req.body.receiver },
      {
        $set: {
          senderDelete: true,
        },
      },
      {
        multi: true,
      }
    );

    const chatMessageForReceiver = Chat.updateMany(
      { senderId: req.body.receiver, receiverId: req.user.sportizenId },
      {
        $set: {
          receiverDelete: true,
        },
      },
      {
        multi: true,
      }
    );

    Promise.all([chatMessageForReceiver, chatMessageForSender])
      .then((resData) => {
        responseHandler({ success: true }, 200, req, res);
      })
      .catch((e) => {
        throw new Error(e);
      });
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = deleteAllMessages;
