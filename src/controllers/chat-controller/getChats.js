const Chat = require('./../../models/chat-model/chat.model');

const errorHandler = require('../../handlers/error.handler');
const responseHandler = require('../../handlers/response.handler');

const getChats = async (req, res) => {
  try {
    const chats = await Chat.aggregate([
      {
        $match: {
          $or: [
            {
              $and: [
                { senderId: req.user.sportizenId },
                { receiverId: req.body.receiverId },
                { senderDelete: false },
              ],
            },
            {
              $and: [
                { senderId: req.body.receiverId },
                { receiverId: req.user.sportizenId },
                { receiverDelete: false },
              ],
            },
          ],
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    responseHandler(chats, 200, req, res);
  } catch (e) {
    errorHandler(e, 400, req, res);
  }
};

module.exports = getChats;
